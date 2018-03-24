import React, {Component} from 'react';
import $ from "jquery";

class BaseTable extends Component {
    entity = 'peaks';

    constructor(entity) {
        super();
        this.entity = entity;
        this.state = {
            data: [],
            pages: null,
            loading: true,
            columns: []
        };
    }

    requestData = (pageSize, page, sorted, filtered) => {
        return new Promise((resolve, reject) => {
            let params = '';

            filtered.forEach(function (filter) {
                params += '&' + filter.id + '=ilike.%' + filter.value + '%';
                //params += '&' + filter.id + '=eq.' + filter.value + '';
            });

            params += '&order=';
            sorted.forEach(function(sortal) {
                params += '' + sortal.id + (sortal.desc ? '.desc' : '.asc') + ',';
            });

            // Trim that last comma if we added it.
            if(sorted.length) {
                params = params.slice(0, -1);
            }

            $.ajax({
                url: 'http://localhost:3000/' + this.entity + '?offset=' + (pageSize * page) + '&limit=' + pageSize + params,
                type: 'GET',
                dataType: 'json',
                success: function (data, status, request) {
                    let rowCount = request.getResponseHeader('Content-Range').split('/').pop(); // TODO: Typing
                    resolve({
                        rows: data,
                        pages: Math.ceil(rowCount / pageSize)
                    });
                },
                error: function (err) {
                    console.log(err);
                    //alert('boo!' + err); // TODO
                },
                beforeSend: function setHeader(xhr) {
                    xhr.setRequestHeader('Prefer', 'count=exact');
                }
            });
        });
    };

    fetchData(state, instance) {
        // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
        // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
        this.setState({loading: true});

        // Request the data however you want.  Here, we'll use our mocked service we created earlier
        this.requestData(
            state.pageSize,
            state.page,
            state.sorted,
            state.filtered,
        ).then(res => {
            // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
            if(res.rows.length) {
                this.setState({
                    data: res.rows,
                    pages: res.pages,
                    loading: false,
                    columns: this.getColumns(res.rows[0])
                });
            }
            else {
                this.setState({
                    data: res.rows,
                    pages: res.pages,
                    loading: false
                });
            }
        });
    }

    getColumns(foo) {
        return Object.keys(foo).map(key => {
            return {
                Header: key,
                accessor: key
            };
        });
    }
}

export default BaseTable;