import React, {Component} from 'react';
import logo from './mountain-logo.png';
import './App.css';
import 'swagger-ui/dist/swagger-ui.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Expeditions from "./Expeditions";
import Members from "./Members";
import {Link} from 'react-router-dom';
import {Route} from 'react-router-dom';
import Peaks from "./Peaks";
import Peak from "./Peak";
import Expedition from "./Expedition";
import Member from "./Member";
import References from "./References";

class App extends Component {
    render() {
        return (
            <div className="App">
                <div>
                    <nav>
                        <Link to="/peaks">Peaks</Link>
                        {'\u00A0'}|{'\u00A0'}<Link to="/expeditions">Expeditions</Link>
                        {'\u00A0'}|{'\u00A0'}<Link to="/members">Members</Link>
                        {/*| <Link to="/references">References</Link>*/}
                    </nav>
                </div>

                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Elizabeth Hawley's Himalayan Database</h1>
                </header>
                <p className="App-intro">
                    BETA
                </p>

                <div className="App-main-container">
                    <Route exact path="/peaks" component={Peaks}/>
                    <Route path="/peaks/:peakid" component={Peak} />
                    <Route exact path="/expeditions" component={Expeditions}/>
                    <Route path="/expeditions/:expid" component={Expedition} />
                    <Route exact path="/members" component={Members}/>
                    <Route path="/members/:memberid" component={Member}/>
                    <Route path="/references" component={References}/>
                </div>
            </div>
        );
    }
}

export default App;