import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../dashboard';
import Businesses from '../businesses/businesses';
import Categories from '../categories/categories.component';

export default function Outlet() {
    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="">
                            <Route path="/app/dashboard" component={Dashboard} />
                            <Route path="/app/businesses" component={Businesses} />
                            <Route path="/app/categories" component={Categories} />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}