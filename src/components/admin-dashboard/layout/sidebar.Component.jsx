import React from 'react';
import { Link } from 'react-router-dom';

export default function SideBar () {
    return (
        <React.Fragment>
            <aside>
                <div className="container">
                    <div className="row">
                        <div className="col pt-5 pl-4">
                            <ul>
                                <li className="text-center mb-5">
                                    <div className="avatar d-inline-block">

                                    </div>
                                </li>
                                <li className="text-left my-3">
                                    <Link to="/app/dashboard" className="text-light">
                                        <i className="fas fa-th"></i>
                                        <span className="d-inline-block ml-3">Dashboard</span>
                                    </Link>
                                </li>
                                <li className="text-left my-3">
                                    <Link to="/app/businesses" className="text-light">
                                        <i className="fas fa-stream"></i>
                                        <span className="d-inline-block ml-3">Businessess</span>
                                    </Link>
                                </li>
                                <li className="text-left my-3">
                                    <Link to="dashboard" className="text-light">
                                        <i className="fas fa-list"></i>
                                        <span className="d-inline-block ml-3">Categories</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>
        </React.Fragment>
    );
}