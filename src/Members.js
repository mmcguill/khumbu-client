import React from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import BaseTable from "./BaseTable";
import {Link} from 'react-router-dom';

const custom_columns = [ {
    Header: 'ID',
    accessor: 'expid',
    Cell: foo => <Link to={`/expeditions/${foo.original.expid}`}>{foo.value}</Link>
},
    {
        Header: 'Peak ID',
        accessor: 'peakid',
        Cell: foo => <Link to={`/peaks/${foo.original.peakid}`}>{foo.value}</Link>
    },
    {
        Header: 'First Name',
        accessor: 'fname',
        Cell: foo => <Link to={`/members/${foo.original.expid}-${foo.original.membid}`}>{foo.value}</Link>
    },
    {
        Header: 'Last Name',
        accessor: 'lname',
        Cell: foo => <Link to={`/members/${foo.original.expid}-${foo.original.membid}`}>{foo.value}</Link>
    },
    {
        Header: 'Sex',
        accessor: 'sex'
    },
    {
        Header: 'Citizen',
        accessor: 'citizen'
    },
    {
        Header: 'Status',
        accessor: 'status'
    },
];

class Members extends BaseTable {
    constructor(props) {
        super(props, 'members');
        this.fetchData = this.fetchData.bind(this);
    }

    render() {
        const {data, pages, loading} = this.state;

        return (<div>
                    <h2>Members</h2>
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
                                id: "expid",
                                desc: false
                            }
                        ]}
                        className="-striped -highlight"
                    />
                </div>);
    }
}

export default Members;