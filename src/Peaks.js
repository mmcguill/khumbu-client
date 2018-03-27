import React from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import BaseTable from "./BaseTable";
import {Link} from 'react-router-dom';

const custom_columns = [ {
        Header: 'ID',
        accessor: 'peakid',
        Cell: foo => <Link to={`/peaks/${foo.original.peakid}`}>{foo.value}</Link>
    },
    {
        Header: 'Name',
        accessor: 'pkname',
        Cell: foo => <Link to={`/peaks/${foo.original.peakid}`}>{foo.value}</Link>
    },
    {
        Header: 'Height (m)',
        accessor: 'heightm'
    },
    {
        Header: 'Height (f)',
        accessor: 'heightf'
    }
];

class Peaks extends BaseTable {
    constructor(props) {
        super(props, 'peaks');

        this.fetchData = this.fetchData.bind(this);
    }

    render() {
        const {data, pages, loading} = this.state;

        return (<div>
                    <h2>Peaks</h2>
                    <ReactTable
                        columns={custom_columns}
                        manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                        data={data}
                        pages={pages} // Display the total number of pages
                        loading={loading} // Display the loading overlay when we need it
                        onFetchData={ this.fetchData } // Request new data when things change
                        filterable
                        defaultPageSize={10}
                        defaultSorted={[
                            {
                                id: "heightm",
                                desc: true
                            }
                        ]}
                        className="-striped -highlight"
                    />
                </div>);
    }
}


export default Peaks;