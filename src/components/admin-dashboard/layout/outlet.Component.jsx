import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from '../dashboard';
import Businesses from '../businesses/businesses';

export default function Outlet() {
    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <Router>
                            <div className="">
                                <Switch>
                                    <Route exact path="/app/dashboard" component={Dashboard} />
                                    <Route exact path="/app/businesses" component={Businesses} />
                                </Switch>
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}