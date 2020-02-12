import React, { Component } from 'react';
import './dashboard.style.scss';
import SummaryCard from '../widgets/cards/summary.card';
import SmallBusinessCard from '../widgets/cards/business-card-small.Component';
import MostViewedCard from '../widgets/cards/most-viewed.card';
import Loader from '../widgets/loader.widget';
import { getRequest } from '../../handlers/requests';
import { Link } from 'react-router-dom';



export default class Dashboard extends Component {

  state = {
    mostRecent: [],
    mostViewed: [],
    meta: {
      images: {
        count: 0
      },
      views: {
        sum: 0
      },
      categories: {
        count: 0
      },
      businesses: {
        count: 0
      }
    },
    recentLoading: false,
    viewsLoading: false
  }
  componentDidMount() {
    this.getRecentBusiness();
    this.getMostBusinessViews();
    this.getBusinessesMeta();
  }

  renderRecentLoader() {
    return (
      this.state.recentLoading ? <Loader /> : ''
    );
  }

  renderViewsLoader() {
    return (
      this.state.viewsLoading ? <Loader /> : ''
    );
  }

  render() {
    return (
      <section className="w-100">
        <div className="container">
          <div className="row">
            <div className="col d-flex justify-content-between">
              <SummaryCard title="Businesses" numbers={this.state.meta.businesses.count} />
              <SummaryCard title="Categories" numbers={this.state.meta.categories.count} />
              <SummaryCard title="Views" numbers={this.state.meta.views.sum} />
              <SummaryCard title="Images" numbers={this.state.meta.images.count} />
            </div>
          </div>

          {/* Most Recent */}
          <div className="col px-0">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="text-light text-left font-weight-bold mt-5">Most Recent</p>
                </div>
              </div>
              <div className="row mt-3 d-flex">
                {this.renderMostRecent()}
                {this.renderRecentLoader()}
              </div>
              <div className="row mt-3">
                <div className="col d-flex justify-content-end">
                  <Link to="/app/businesses">
                    <button className="btn text-small rounded-button">View all businesses</button>
                  </Link>
                </div>
              </div>
            </div>

            <hr />
          </div>

          {/* Most Viewed */}
          <div className="col px-0 pb-5">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="text-light text-left font-weight-bold mt-5">Most Viewed</p>
                </div>
              </div>
              <div className="row mt-3 d-flex">
                {this.renderMostViews()}
                {this.renderViewsLoader()}
              </div>

              <div className="row mt-3">
                <div className="col d-flex justify-content-end">
                  <Link to="/app/businesses">
                    <button className="btn text-small rounded-button">View all businesses</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  renderMostRecent() {
    return (
      this.state.mostRecent.map(item => {
        return (
          <div key={item.id} className="col-3">
            <SmallBusinessCard data={item} />
          </div>
        )
      })
    );
  }

  renderMostViews() {
    return (
      this.state.mostViewed.map(item => {
        return (
          <div key={item.id} className="col-3">
            <MostViewedCard data={item} />
          </div>
        )
      })
    );
  }

  getRecentBusiness() {
    const url = `businesses?sort=recent`;

    this.setState({ recentLoading: true });
    getRequest(url)
      .then(res => {
        const { data } = res.data;
        this.setState({ recentLoading: false });
        this.setState({ mostRecent: data });
      })
      .catch(e => console.log(e));
  }

  getMostBusinessViews() {
    const url = `businesses?sort=views`;

    this.setState({ viewsLoading: true });
    getRequest(url)
      .then(res => {
        const { data } = res.data;
        this.setState({ viewsLoading: false });
        this.setState({ mostViewed: data });
      })
      .catch(e => console.log(e));
  }

  getBusinessesMeta() {
    const url = `businesses/meta`;

    // this.setState({ recentLoading: true });
    getRequest(url)
      .then(res => {
        const { data } = res.data;
        // this.setState({ recentLoading: false });
        this.setState({ meta: data });
      })
      .catch(e => console.log(e));
  }
}