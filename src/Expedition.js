import React, {Component} from 'react';
import './Expedition.css'
import axios from 'axios';
import {Link} from 'react-router-dom';
import qs from 'qs'

class Expedition extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {expid: 'Loading...', pkname: 'Loading...'}
        };
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_SERVER}/exped?expid=eq.${this.props.match.params.expid}`)
            .then(res => {
                if (res.data.length > 1) {
                    alert('Non Unique Exp Id' + this.props.match.params.expid); // TODO
                }
                this.setState({data: res.data[0]});
            });
    }

    render() {
        return (<div>
            <h2>Expedition { this.state.data.expid } to <Link to={{pathname: `/peaks/${this.state.data.peakid}`}}>{this.state.data.peakid}</Link></h2>
            <h4><Link to={{pathname: '/members', search: qs.stringify({expid: this.state.data.expid})}}>Click here to see
                all Members of this Expedition</Link>
            </h4>
            <table className="Expedition-detail-table" border="1px solid">
                <tbody>
                {Object.keys(this.state.data).map((object, i) => <tr>
                    <td>{object}</td>
                    <td>{this.state.data[object]}</td>
                </tr>)}
                </tbody>
            </table>
            <h4>
                <Link to={{pathname: '/members', search: qs.stringify({expid: this.state.data.expid})}}>Click here to see
                all Members of this Expedition</Link>
            </h4>
        </div>);
    }
}

export default Expedition;