import React, {Component} from 'react';
import './Expedition.css'
import axios from 'axios';

class Expedition extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: { expid: 'Loading...' }
        };
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_SERVER}/exped?expid=eq.${this.props.match.params.expid}`)
            .then(res => {
                if(res.data.length > 1) {
                    alert('Non Unique Exp Id' + this.props.match.params.expid); // TODO
                }
                this.setState({ data: res.data[0] });
            });
    }

    render() {
        return (<div>
                    <h2>{ this.state.data.expid }</h2>
                    <table className="Expedition-detail-table" border="1px solid">
                        <tbody>
                        {Object.keys(this.state.data).map((object, i) => <tr><td>{object}</td><td>{this.state.data[object]}</td></tr>)}
                        </tbody>
                    </table>
                </div>);
    }
}

export default Expedition;