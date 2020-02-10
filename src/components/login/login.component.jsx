import React, { Component } from 'react';

import { FormControl } from '../widgets/form-controls/form-control';
import { Button } from '../widgets/form-controls/button';
import { loginRequest, correctCredentials } from '../../handlers/requests';
import { setToken, setUserData, emailValidator } from '../../handlers/helpers';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../../actions';

import favicon from '../../img/lion.png';

class LoginPage extends Component {

    state = {
        user: {
            email: "",
            password: ""
        },
        errors: {},
        submitted: false,
        errorMessage: '',
        loginLoading: false
    };

    componentDidMount() {
        if (localStorage.getItem('user') !== null && localStorage.getItem('token')) {
            this.props.history.push('/app/dashboard');
        }
    }

    handleChange = event => {
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });
    };

    onSubmit = () => {
        const {
            user: { email, password },
        } = this.state;
        let err = {};

        this.setState({ errorMessage: '' })

        if (!email || !emailValidator(email)) {
            err.email = "Enter a valid email!";
        }

        if (password.length < 6) {
            err.password = "Password must be at least 6 characters!";
        }

        this.setState({ errors: err });
        this.setState({ submitted: true });


        if (Object.getOwnPropertyNames(this.state.errors).length) {
            return;
        }

        if (email !== correctCredentials.email || password !== correctCredentials.password) {
            this.setState({ errorMessage: 'Wrong username or Password' })
            return;
        }

        const data = {
            email: 'johndoe@email.com',
            password: 'password'
        }

        this.setState({ loginLoading: true });
        loginRequest(data)
            .then(res => {
                setToken(res.data.data.token);
                delete res.data.data.token;
                setUserData(res.data.data);
                this.setState({ loginLoading: false });

                this.props.changeAuth(true);
                this.props.history.push('/app/dashboard');
            })
            .catch(e => { console.log(e); this.setState({ loginLoading: false }); });
    }

    render() {
        const {
            errors,
            user: { email, password },
            errorMessage
        } = this.state;
        return (
            <React.Fragment>
                {/* Wrapper div */}
                <div className="d-flex position-relative">
                    <div className="left w-50" style={styles.full_height}></div>
                    <div className="right w-50"></div>
                    <div className="container position-absolute" style={styles.center_screen}>
                        <div className="row">
                            <div className="col d-flex align-items-center justify-content-center" style={styles.inner_height}>
                                <div>
                                    {/* Favicon */}
                                    <div className="mx-auto">
                                        <Link to="/"><img src={favicon} alt='favicon' width="150" /></Link>
                                    </div>
                                    <h1 className="text-light font-weight-light">Business Directory</h1>
                                </div>
                            </div>
                            <div className='col d-flex align-items-center justify-content-center'>
                                <div className="w-75">
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
                                            className="btn font-weight-light btn-primary mt-3 py-2 w-100 border-0"
                                            loading={this.state.loginLoading}
                                            handleClick={this.onSubmit}
                                        />
                                    </div>

                                    <p className="text-center text-small text-danger mt-3">{errorMessage}</p>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </React.Fragment>
        );
    }
}

const styles = {
    full_height: {
        height: '100vh',
        backgroundColor: '#434f80'
    },
    inner_height: {
        height: '75vh',
        backgroundColor: '#434f80'
    },
    center_screen: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        'boxShadow': '0px 13px 38px -7px rgba(0,0,0,0.58)'
    }
}

function mapStateToProps(state) {
    return { auth: state.auth }
}

export default connect(mapStateToProps, actions)(LoginPage)