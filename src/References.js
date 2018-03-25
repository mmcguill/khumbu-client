import React from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import BaseTable from "./BaseTable";

class References extends BaseTable {
    constructor() {
        super('refer');
        this.fetchData = this.fetchData.bind(this);
    }

    render() {
        const {data, pages, loading, columns} = this.state;

        return (
            <div>
                <h2>References</h2>
                <ReactTable
                    columns={columns}
                    manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                    data={data}
                    pages={pages} // Display the total number of pages
                    loading={loading} // Display the loading overlay when we need it
                    onFetchData={ this.fetchData } // Request new data when things change
                    filterable
                    defaultPageSize={10}
                    // defaultSorted={[
                    //     {
                    //         id: "expid",
                    //         desc: false
                    //     }
                    // ]}
                    className="-striped -highlight"
                />
            </div>);
    }
}

export default References;