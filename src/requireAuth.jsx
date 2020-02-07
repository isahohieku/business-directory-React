import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getToken, getUserData} from './handlers/helpers';
import * as actions from './actions';

export default (ChildComponent) => {
    class ComposedComponent extends Component {

        componentDidMount() {
            this.navigateAway();
        }

        componentDidUpdate() {
            this.navigateAway();
        }

        navigateAway() {
            if (!this.props.auth || !this.checkLocalStorage()) {
                this.props.history.push('/login');
                this.props.changeAuth(false);
            }
        }

        checkLocalStorage() {
            if(getUserData() === null && !getToken()) {
                return false;
            }
            return true;
        }

        render() {
            return <ChildComponent {...this.props} />;
        }
    }

    function mapStateToProps(state) {
        return { auth: state.auth}
    }

    return connect(mapStateToProps, actions)(ComposedComponent);
} 