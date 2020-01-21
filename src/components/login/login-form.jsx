import React, { Component } from 'react';
import { FormControl } from '../form-controls/form-control';
import { Button } from '../form-controls/button';

import { loginRequest, correctCredentials } from '../../handlers/requests';
import { setToken, setUserData } from '../../handlers/helpers';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }
    state = {
        user: {
            email: "",
            password: ""
        },
        errors: {},
        submitted: false,
        errorMessage: ''
    };

    handleChange = event => {
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });
    };

    handleLogin = () => {
        this.props.onLoginStatusChange(true);
    }

    onSubmit = () => {
        const {
            user: { email, password },
        } = this.state;
        let err = {};

        this.setState({errorMessage: ''})

        if (!email || !this.validateEmail(email)) {
            err.email = "Enter a valid email!";
        }

        if (password.length < 6) {
            err.password = "Password must be at least 6 characters!";
        }

        this.setState({ errors: err }, () => {
            if (Object.getOwnPropertyNames(this.state.errors).length === 0) {
                this.setState({ submitted: true });
            }
        });

        if (email !== correctCredentials.email || password !== correctCredentials.password) {
            this.setState({ errorMessage: 'Wrong username or Password' })
            return;
        }

        const data = {
            email: 'johndoe@email.com',
            password: 'password'
        }

        loginRequest(data)
        .then(res => {
            setToken(res.data.data.token);
            delete res.data.data.token;
            setUserData(res.data.data);
            this.props.changeAuth(true);
            this.props.history.push('/app');
            // this.handleLogin();
        })
    };

    render() {
        const {
            errors,
            user: { email, password },
            errorMessage
        } = this.state;
        return (
            <div className="w-50">
                <h3 className="text-left">Login</h3>
                <FormControl
                    label="Email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={this.handleChange}
                    placeholder="Enter email"
                    error={errors.email}
                    required
                    className="form-control "
                />

                <div className="mt-3">
                    <FormControl
                        label="Password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={this.handleChange}
                        placeholder="Enter password..."
                        error={errors.password}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mt-3">
                    <Button
                        type="submit"
                        label="Submit"
                        className="btn font-weight-light btn-primary text-light mt-3 py-2 w-100 border-0"
                        handleClick={this.onSubmit}
                    />
                </div>

                <p className="text-center text-small text-danger mt-3">{errorMessage}</p>
            </div>
        );
    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}

function mapStateToProps(state) {
    return { auth: state.auth }
}

export default connect(mapStateToProps, actions)(LoginForm)
