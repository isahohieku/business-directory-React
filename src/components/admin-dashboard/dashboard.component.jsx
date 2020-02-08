import React, { Component } from 'react';
import './dashboard.style.scss';
import SummaryCard from '../widgets/cards/summary.card';
import SmallBusinessCard from '../widgets/cards/business-card-small.Component';
import MostViewedCard from '../widgets/cards/most-viewed.card';
import { getRequest } from '../../handlers/requests';
import { Link } from 'react-router-dom';



export default class Dashboard extends Component {

  state = {
    mostRecent: [],
    mostViewed: []
  }
  componentDidMount() {
    this.getRecentBusiness();
    this.getMostBusinessViews();
  }

  render() {
    return (
      <section className="w-100">
        <div className="container">
          <div className="row">
            <div className="col d-flex justify-content-between">
              <SummaryCard title="Business" numbers="200" />
              <SummaryCard title="Categories" numbers="50" />
              <SummaryCard title="Views" numbers="1500" />
              <SummaryCard title="Images" numbers="500" />
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
              </div>
              <div className="row mt-3">
                <div className="col d-flex justify-content-end">
                  <Link to="/app/businesses">
                    <button className="btn text-small rounded-button">View all businesses</button>
                  </Link>
                </div>
              </div>
            </div>

            <hr/>
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

    getRequest(url)
      .then(res => {
        const { data } = res.data;
        this.setState({ mostRecent: data });
      })
      .catch(e => console.log(e));
  }

  getMostBusinessViews() {
    const url = `businesses?sort=views`;

    getRequest(url)
      .then(res => {
        const { data } = res.data;
        this.setState({ mostViewed: data });
      })
      .catch(e => console.log(e));
  }
}