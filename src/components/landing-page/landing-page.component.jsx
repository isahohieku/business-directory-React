import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import favicon from '../../img/lion.png';
import { getRequest } from '../../handlers/requests';
import './styles.scss';
import RenderLists from './search-result';
import Header from '../layout/header.component';
import Footer from '../layout/footer.component';
import MostRecentCard from '../widgets/cards/most-recent.card';
import Loader from '../widgets/loader.widget';

class LandingPage extends Component {

    handleSearchChangeDelay;
    constructor(props) {
        super(props);
        this.handleSearchChange = _.debounce((searchTerm) => {
            this.setState({ searchTerm });
            this.makeRequest()
        }, 500);

        this.state = {
            searchTerm: '',
            searchLoading: false,
            mostRecentLoading: false,
            searchResult: [],
            mostRecent: []
        }
    }

    componentDidMount() {
        this.getRecentBusiness();
    }

    getRecentBusiness() {
        const url = `businesses?sort=recent`;

        this.setState({ mostRecentLoading: true });
        getRequest(url)
            .then(res => {
                this.setState({ mostRecentLoading: false });
                const { data } = res.data;
                this.setState({ mostRecent: data });
            })
            .catch(e => { console.log(e); this.setState({ mostRecentLoading: false }); });
    }

    makeRequest() {
        const url = `businesses/search?term=${this.state.searchTerm}`;

        this.setState({ searchLoading: true });
        this.setState({ searchResult: [] })
        getRequest(url)
            .then(res => {
                this.setState({ searchResult: res.data.data });
                this.setState({ searchLoading: false });
            })
            .catch(e => { console.log(e); this.setState({ searchLoading: false }); });
    }

    renderLoader() {
        const background_color = {
            backgroundColor: '#434f80'
        }
        return (
            this.state.mostRecentLoading ? <Loader customStyle={background_color} /> : ''
        );
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col px-0">
                        {/* Header */}
                        <Header />

                        {/* main */}
                        <header>
                            <div className="jumbotron2 d-flex align-items-center justify-content-center">
                                <div className="w-100 w-md-75">
                                    {/* Favicon */}
                                    <div>
                                        <img src={favicon} alt='favicon' width="150" />
                                    </div>
                                    <h1 className="text-light text-center mb-0 findHeader" style={{ fontSize: '48px' }}>Find that business <span className="font-weight-bold">now</span>.</h1>

                                    {/* Autocomplete Search */}
                                    <div className="container mt-3 position-relative">
                                        <div className="row">
                                            <div className="col">
                                                <form className="w-100 d-flex justify-content-between" autoComplete="off" onSubmit={this.handleFormSubmission}>
                                                    <input type="search" name="searchTerm" placeholder="Search a business" className="search px-3" onChange={e => this.handleSearchChange(e.target.value)} />
                                                </form>
                                            </div>
                                        </div>
                                        <div className="row position-absolute w-100">
                                            <div className="col">
                                                <div className=" w-100">
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
                            <div className="container mb-5">
                                <div className="row">
                                    <div className="col">
                                        <h4 className="mt-5 mb-3 text-left text-primary2">Recently added businesses</h4>
                                    </div>
                                </div>
                                <div className="row py-4">
                                    {this.renderMostRecent()}
                                    {this.renderLoader()}
                                </div>
                            </div>
                        </main>

                        {/* Second section */}
                        <section>
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

                        </section>

                        {/* Footer */}
                        <Footer />
                    </div>
                </div>
            </div>
        );
    }

    renderMostRecent() {
        return (
            this.state.mostRecent.map(item => {
                return (
                    <div key={item.id} className="col-10 col-md-3 mt-4 mt-md-0 mx-auto">
                        <Link to={`/business/${item.id}`}><MostRecentCard data={item} /></Link>
                    </div>
                )
            })
        );
    }

}

export default LandingPage;
