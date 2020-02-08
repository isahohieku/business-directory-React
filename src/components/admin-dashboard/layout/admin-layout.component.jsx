import React from 'react';
import { connect } from 'react-redux';
import * as action from '../../../actions';

import SideBar from './sidebar.component';
import Outlet from './outlet.component';

function Layout() {
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

function mapStateToProps(state) {
    return { auth: state.auth }
  }
  
  export default connect(mapStateToProps, action)(Layout);