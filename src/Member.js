import React, {Component} from 'react';
import './Member.css'
import axios from 'axios';

class Member extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: { fname: 'Loading...', lname: '' }
        };
    }

    componentDidMount() {
        var foo = this.props.match.params.memberid.split('-'); // TODO:

        axios.get(`${process.env.REACT_APP_SERVER}/members?expid=eq.${foo[0]}&membid=eq.${foo[1]}`)
            .then(res => {
                this.setState({ data: res.data[0] });
            });
    }

    render() {
        return (<div>
                    <h2>{ this.state.data.fname + ' ' + this.state.data.lname }</h2>
                    <table className="Member-detail-table" border="1px solid">
                        <tbody>
                        {Object.keys(this.state.data).map((object, i) => <tr><td>{object}</td><td>{this.state.data[object]}</td></tr>)}
                        </tbody>
                    </table>
                </div>);
    }
}

export default Member;