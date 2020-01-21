import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

class privateRouteWrapper extends Component {
    constructor(props) {
      super(props)
  
      this.state = { isLoggedIn: true }
    }

    render() {

        const {children, auth, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={({ location }) =>
                    true ? (
                        children
                    ) : (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    state: { from: location }
                                }}
                            />
                        )
                }
            />
        );
    }
}

export default privateRouteWrapper;

