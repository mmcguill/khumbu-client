import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import 'swagger-ui/dist/swagger-ui.css';
import Form from "react-jsonschema-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import _ from "lodash";
import $ from 'jquery';


const requestData = (pageSize, page, sorted, filtered) => {
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
            url: 'http://localhost:3000/peaks?offset=' + (pageSize * page) + '&limit=' + pageSize + params,
            type: 'GET',
            dataType: 'json',
            success: function (data, status, request) {
                let rowCount = request.getResponseHeader('Content-Range').split('/').pop();
                handleResponse(data, resolve, sorted, page, pageSize, rowCount);
            },
            error: function (err) {
                console.log(err);
                alert('boo!' + err); // TODO
            },
            beforeSend: function setHeader(xhr) {
                xhr.setRequestHeader('Prefer', 'count=exact');
            }
        });
    });
};

const handleResponse = (results, resolve, sorted, page, pageSize, rowCount) => {
    const res = {
        rows: results,
        pages: Math.ceil(rowCount / pageSize)
    };

    resolve(res);
};

class App extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            pages: null,
            loading: true,
            columns: []
        };
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(state, instance) {
        // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
        // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
        this.setState({loading: true});

        // Request the data however you want.  Here, we'll use our mocked service we created earlier
        requestData(
            state.pageSize,
            state.page,
            state.sorted,
            state.filtered
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

    render() {
        const {data, pages, loading, columns} = this.state;

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and to reload.
                </p>

                <div>
                    <ReactTable
                        columns={columns}
                        manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                        data={data}
                        pages={pages} // Display the total number of pages
                        loading={loading} // Display the loading overlay when we need it
                        onFetchData={this.fetchData} // Request new data when things change
                        filterable
                        defaultPageSize={10}
                        defaultSorted={[
                            {
                                id: "pkname",
                                desc: false
                            }
                        ]}
                        className="-striped -highlight"
                        SubComponent={(row) => {
                                return (
                                    <div>
                                        You can put any component you want here, even another React Table! You even have
                                        access to the row-level data if you need! Spark-charts, drill-throughs,
                                        infographics... the possibilities are endless!
                                    </div>
                                )
                            }
                        }
                    />
                </div>
            </div>
        );
    }
}

export default App;