import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import requiresAuth from './requireAuth';
import "./App.scss";
import LoginPage from './components/login/page';
import LandingPage from "./components/landing-page/landing_page";
import AdminLayout from './components/admin-dashboard/layout/admin-layout.Component';
import business from "./components/business/business.Component";
import { connect } from 'react-redux';
import * as action from './actions';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/app" component={requiresAuth(AdminLayout)} />
            <Route path="/business/:id" component={business} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth }
}

export default connect(mapStateToProps, action)(App);
