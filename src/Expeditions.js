import React from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import BaseTable from "./BaseTable";
import {Link} from 'react-router-dom';
import qs from 'qs'

const custom_columns = [{
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
        Header: 'Primary Route',
        accessor: 'route1'
    },
    {
        Header: 'Nation',
        accessor: 'nation'
    },
    {
        Header: 'Highpoint (m)',
        accessor: 'highpoint'
    },
    {
        Header: 'Year',
        accessor: 'year'
    },
];

class Expeditions extends BaseTable {
    constructor(props) {
        super(props, 'exped');

        let queryString = this.props.location.search;
        let queryParams = qs.parse(queryString,{ ignoreQueryPrefix: true });

        if (queryParams['peakid']) {
            this.state = {filtered: [{id: "peakid", value: queryParams['peakid']}]};
        }
        else {
            this.state = {filtered: []};
        }

        this.fetchData = this.fetchData.bind(this);
    }

    render() {
        const {data, pages, loading} = this.state;

        return (<div>
            <h2>Expeditions</h2>
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
                        id: "highpoint",
                        desc: true
                    },
                    {
                        id: "year",
                        desc: false
                    }
                ]}
                filtered={ this.state.filtered }
                onFilteredChange={filtered => this.setState({filtered})}
                className="-striped -highlight"
            />
        </div>);
    }
}

export default Expeditions;