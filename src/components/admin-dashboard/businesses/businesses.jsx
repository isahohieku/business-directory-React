import React, { Component } from "react";
import { getRequest } from '../../../handlers/requests';
import './businesses.Style.scss';
import CreateBusinessModal from "../../modals/create-business.Component";

class Businesses extends Component {
    constructor() {
        super();
        this.state = {
            businesses: []
        }
    }

    componentDidMount() {
        const url = 'http://localhost:4000/api/businesses';

        getRequest(url)
            .then(res => {
                this.setState({ businesses: res.data.data })
            })
            .catch(e => console.log(e));
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col pt-5 d-flex justify-content-between" style={{ minHeight: '100vh' }}>
                            <h4 className="text-light">All Businesses</h4>
                            <div>
                                <CreateBusinessModal />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Businesses;
