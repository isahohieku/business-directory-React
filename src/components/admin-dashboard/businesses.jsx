import React, { Component } from "react";
import { getRequest } from '../../handlers/requests';

class Businesses extends Component {

    state = {
        businesses: []
    }

    componentDidMount() {
        const url ='businesses';

        getRequest(url)
        .then(res => {
            this.setState({ businesses: res.data.data})
        })
        .catch(e => console.log(e));
    }
    render() {
        return (
            <div className="container-fluid">

            </div>
        );
    }
}

export default Businesses;
