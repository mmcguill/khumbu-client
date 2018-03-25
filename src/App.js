import React, {Component} from 'react';
import logo from './mountain-logo.png';
import './App.css';
import 'swagger-ui/dist/swagger-ui.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExpeditionsList from "./Expeditions";
import MembersList from "./Members";
import ReferencesList from "./References";
import {Link} from 'react-router-dom';
import {Route} from 'react-router-dom';
import PeaksList from "./PeaksList";
import Peak from "./Peak";

const Expeditions = () => (
    <div>
        <h2>Expeditions</h2>
        <ExpeditionsList/>
    </div>
);

const Members = () => (
    <div>
        <h2>Members</h2>
        <MembersList/>
    </div>
);

const References = () => (
    <div>
        <h2>References</h2>
        <ReferencesList/>
    </div>
);

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Elizabeth Hawley's Himalayan Database</h1>
                </header>
                <p className="App-intro">
                    BETA
                </p>

                <div>
                    <nav>
                        <Link to="/peaks">Peaks</Link>
                        | <Link to="/expeditions">Expeditions</Link>
                        | <Link to="/members">Members</Link>
                        | <Link to="/references">References</Link>
                    </nav>
                </div>

                <div className="App-main-container">
                    <Route exact path="/peaks" component={PeaksList}/>
                    <Route path="/peaks/:peakid" component={Peak} />
                    <Route path="/expeditions" component={Expeditions}/>
                    <Route path="/members" component={Members}/>
                    <Route path="/references" component={References}/>
                </div>
            </div>
        );
    }
}

export default App;