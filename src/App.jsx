import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import requiresAuth from './requireAuth';
import "./App.scss";
import LoginPage from './components/login/login.component';
import LandingPage from "./components/landing-page/landing-page.component";
import AdminLayout from './components/admin-dashboard/layout/admin-layout.component';
import Business from "./components/business/business.component";
import ErrorPage from './components/error-page/error-page.component';
import { connect } from 'react-redux';
import * as action from './actions';
import ScrollToTop from './handlers/scroll.to.top';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <ScrollToTop />
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/app" component={requiresAuth(AdminLayout)} />
              <Route path="/business/:id" component={Business} />
              <Route path="*" component={ErrorPage} />
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
