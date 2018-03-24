import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import 'swagger-ui/dist/swagger-ui.css';
import Form from "react-jsonschema-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import _ from "lodash";
import $ from 'jquery';
import Peaks from "./Peaks";
import Expeditions from "./Expeditions";
import Members from "./Members";
import References from "./References";

class App extends Component {
    render() {
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
                    <h1>Peaks</h1>
                    <Peaks/>
                </div>

                <div>
                    <h1>Expeditions</h1>
                    <Expeditions/>
                </div>

                <div>
                    <h1>Members</h1>
                    <Members/>
                </div>

                <div>
                    <h1>References</h1>
                    <References/>
                </div>
            </div>
        );
    }
}

export default App;