import React, {Component} from 'react';
import './Peak.css'
import axios from 'axios';

class Peak extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: { pkname: 'Loading...' }
        };
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_SERVER}/peaks?peakid=eq.${this.props.match.params.peakid}`)
            .then(res => {
                this.setState({ data: res.data[0] });
            });
    }

    render() {
        return (<div>
                    <h2>{ this.state.data.pkname }</h2>
                    <table className="Peak-detail-table" border="1px solid">
                        <tbody>
                        {Object.keys(this.state.data).map((object, i) => <tr><td>{object}</td><td>{this.state.data[object]}</td></tr>)}
                        </tbody>
                    </table>
                </div>);
    }
}

export default Peak;