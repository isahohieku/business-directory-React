import React from 'react';
import SideBar from './sidebar.Component';
import Outlet from './outlet.Component';

export default function Layout() {
    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col d-flex px-0">
                        <SideBar />
                        <section className="hacked-width main-outlet">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col d-flex justify-content-around">
                                        <Outlet />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}