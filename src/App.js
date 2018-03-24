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
        $.getJSON('http://localhost:3000/peaks?limit=1')
            .then((results) => {
                console.log(results);

                let filteredData = results;

                // You can use the filters in your request, but you are responsible for applying them.
                if (filtered.length) {
                    filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
                        return filteredSoFar.filter(row => {
                            return (row[nextFilter.id] + "").includes(nextFilter.value);
                        });
                    }, filteredData);
                }
                // You can also use the sorting in your request, but again, you are responsible for applying it.
                const sortedData = _.orderBy(
                    filteredData,
                    sorted.map(sort => {
                        return row => {
                            if (row[sort.id] === null || row[sort.id] === undefined) {
                                return -Infinity;
                            }
                            return typeof row[sort.id] === "string"
                                ? row[sort.id].toLowerCase()
                                : row[sort.id];
                        };
                    }),
                    sorted.map(d => (d.desc ? "desc" : "asc"))
                );

                // You must return an object containing the rows of the current page, and optionally the total pages number.
                const res = {
                    rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
                    pages: Math.ceil(filteredData.length / pageSize)
                };

                resolve(res);
            });
    });
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
            if(res.rows) {
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
                        className="-striped -highlight"
                    />
                </div>
            </div>
        );
    }
}

export default App;