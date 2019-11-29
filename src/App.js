
import './App.css';
import MonitorPanel from './components/MonitorPanel';
import LoginPanel from './components/LoginPanel';
import RegisterPanel from './components/RegisterPanel';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";



class App extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            
            <div>
                <Router>
                    <div className="root-containe">
                        <Route path="/monitor" component={MonitorPanel} />
                        <Route exact path="/" component={LoginPanel} />
                        <Route path="/registerPage" component={RegisterPanel} />
                    </div>
                </Router>
            </div>
        );
    }
}
export default App;


