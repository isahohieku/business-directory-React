import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import favicon from '../../img/lion.png';
import { getRequest } from '../../handlers/requests';
import _ from 'lodash';
import './styles.scss';
import RenderLists from './search-result';

class LandingPage extends Component {

    handleSearchChangeDelay;
    constructor(props) {
        super(props);
        this.handleSearchChange = _.debounce((searchTerm) => {
            this.setState({ searchTerm });
            this.makeRequest()
        }, 500);

        this.handleFormSubmission = this.handleFormSubmission.bind(this);

        this.state = {
            searchTerm: '',
            searchLoading: false,
            searchResult: []
        }
    }

    makeRequest() {
        const url = `https://business-directory-backend.herokuapp.com/api/businesses/search?term=${this.state.searchTerm}`;

        this.setState({ searchLoading: true });
        this.setState({ searchResult: [] })
        getRequest(url)
            .then(res => {
                this.setState({ searchResult: res.data.data });
                this.setState({ searchLoading: false });
            })
            .catch(e => { console.log(e); this.setState({ searchLoading: false }); });
    }

    handleFormSubmission(event) {
        event.preventDefault();
        alert('yes');
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col px-0">
                        <nav className="bg-primary2 py-4">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col d-flex justify-content-between">
                                        <h5>Business Directory</h5>

                                        <Link to="/login" className="text-light">Admin</Link>
                                    </div>
                                </div>
                            </div>
                        </nav>

                        {/* main */}
                        <header>
                            <div className="jumbotron2 d-flex align-items-center justify-content-center">
                                <div className="w-75">
                                    {/* Favicon */}
                                    <div>
                                        <img src={favicon} alt='favicon' width="150" />
                                    </div>
                                    <h1 className="text-light text-center mb-0" style={{ fontSize: '48px' }}>Find that business <span className="font-weight-bold">now</span>.</h1>

                                    {/* Autocomplete Search */}
                                    <div className="container mt-3 position-relative">
                                        <div className="row">
                                            <div className="col">
                                                <form className="w-100 d-flex justify-content-between" autoComplete="off" onSubmit={this.handleFormSubmission}>
                                                    <input type="search" name="searchTerm" placeholder="Search a business" className="search px-3" onChange={e => this.handleSearchChange(e.target.value)} />
                                                    <button className="btn bg-primary2 text-white w-20 search-button">Search</button>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="row position-absolute w-100">
                                            <div className="col">
                                                <div className=" w-80">
                                                    <RenderLists list={this.state.searchResult} loading={this.state.searchLoading} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* First Section */}
                        <main>
                            <div className="container-fluid bg-primary2">
                                <div className="row">
                                    <div className="col py-5">

                                        <div className="container">
                                            <div className="row">
                                                <div className="col py-5">
                                                    <h3 className="text-light text-capitalize">The best place to fine business details</h3>

                                                    <p className="text-light py-2">
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis autem quis velit beatae modi consectetur incidunt in at. Dolorem architecto et at sed error sunt quae ut temporibus nesciunt esse!
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, ad soluta aspernatur officia in deserunt, vel tempore earum ullam iste blanditiis expedita repellat ex. Ipsam velit aliquam at est eius?
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, optio rerum, doloribus explicabo corrupti eligendi a quas natus deserunt, ea cum vitae. Fugit cupiditate deserunt quas ea perspiciatis minus corrupti!
                                                    </p>
                                                    <button className="button py-2 px-5 font-weight-bold mt-4">Learn more</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }

}

export default LandingPage;
