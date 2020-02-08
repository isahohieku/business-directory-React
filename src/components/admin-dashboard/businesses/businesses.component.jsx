import React, { Component } from "react";
import { getRequest } from '../../../handlers/requests';
import './businesses.style.scss';
import CreateBusinessModal from "../../modals/create-business.component";
import SmallBusinessCard from '../../widgets/cards/business-card-small.Component';

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

    renderAllBusinesses() {
        return (
            this.state.businesses.map((item, i) => {

                if (i < 4) {
                    return (
                        <div key={item.id} className="col-3">
                            <SmallBusinessCard data={item} />
                        </div>
                    )
                }

                return (
                    <div key={item.id} className="col-3 mt-5">
                        <SmallBusinessCard data={item} />
                    </div>
                )
                
            })
        );
    }

    render() {
        return (
            <React.Fragment>
                <div className="container"  style={{ minHeight: '100vh' }}>
                    <div className="row">
                        <div className="col pt-5 d-flex justify-content-between">
                            <h4 className="text-light">All Businesses</h4>
                            <div>
                                <CreateBusinessModal />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        {this.renderAllBusinesses()}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Businesses;
