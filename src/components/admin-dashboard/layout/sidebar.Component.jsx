import React from 'react';
import '../dashboard.Style.scss';
import { NavLink } from 'react-router-dom';

export default function SideBar () {
    return (
        <React.Fragment>
            <aside>
                <div className="container">
                    <div className="row">
                        <div className="col pt-5 px-0">
                            <ul>
                                <li className="text-center mb-5">
                                    <div className="avatar d-inline-block">

                                    </div>
                                </li>
                                <li className="text-left my-5">
                                    <NavLink to="/app/dashboard" className="text-light pl-4 py-2" activeClassName="activeLink">
                                        <i className="fas fa-th"></i>
                                        <span className="d-inline-block ml-3">Dashboard</span>
                                    </NavLink>
                                </li>
                                <li className="text-left my-5">
                                    <NavLink to="/app/businesses" className="text-light pl-4 py-2" activeClassName="activeLink">
                                        <i className="fas fa-stream"></i>
                                        <span className="d-inline-block ml-3">Businessess</span>
                                    </NavLink>
                                </li>
                                <li className="text-left my-5">
                                    <NavLink to="/app/categories" className="text-light pl-4 py-2" activeClassName="activeLink">
                                        <i className="fas fa-list"></i>
                                        <span className="d-inline-block ml-3">Categories</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>
        </React.Fragment>
    );
}