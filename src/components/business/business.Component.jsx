import React, { Component } from "react";
import { getRequest } from '../../handlers/requests';
import './business.Style.scss';

class BusinessComponent extends Component {
  state = {
    data: {},
    avatar: 'https://placeimg.com/200/200/any',
    images: []
  };

  constructor(props) {
    super();
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const url = `https://business-directory-backend.herokuapp.com/api/businesses?id=${id}`;

    getRequest(url)
      .then(res => {
        const { data } = res.data;
        this.setState({ data });
        this.setState({ avatar: res.data.data.images[0].imageUrl });
        this.setState({ images: res.data.data.images });
        console.log(res.data.data);
      })
      .catch(e => console.log(e));
  }

  render() {
    return (
      <div className="wrapper pt-5">
        <div className="container mt-5 px-0">
          <div className="row">
            <div className="col">
              <div className="w-100 px-4 center_screen header linear_bg">
                {/* Meta */}
                <div className="d-flex align-items-end h-100">
                  <div className="more-left">
                    <p className="text-light mb-0 text-left"><b>{this.state.data.name}</b></p>
                    <p className="text-light text-left"><span className="d-inline-block">{this.state.data.location}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Avatar Section */}
        <div className="container neg-margin">
          <div className="row">
            <div className="col">
              {/* avatar section */}
              <div>
                {/* Avatar */}
                <div className="avatar-wrapper-2 d-flex justify-content-center align-items-center ml-5">
                  <div className="avatar-wrapper d-flex justify-content-center align-items-center">
                    <div className="avatar" style={this.getAvatar()}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Basic Meta */}
        <div className="container neg-margin bg-lights py-3">
          <div className="row d-flex justify-content-end">
            <div className="col-3 d-flex align-items-center">
              <div>
                <p className="text-secondary text-left mb-0 font-weight-bold text-uppercase">Email</p>
                <p className="text-secondary text-left mb-0"><i className="fas fa-envelope"></i> {this.state.data.email}</p>
              </div>
            </div>
            <div className="col-3 d-flex align-items-center">
              <div>
                <p className="text-secondary text-left mb-0 font-weight-bold text-uppercase">Phone</p>
                <p className="text-secondary text-left mb-0"><i className="fas fa-phone fa-rotate-90"></i> {this.state.data.phone}</p>
              </div>
            </div>
            <div className="col-3 d-flex align-items-center">
              <div>
                <p className="text-secondary text-left mb-0 font-weight-bold text-uppercase">Created on</p>
                <p className="text-secondary text-left mb-0"><i className="fas fa-clock"></i> {this.getCreatedDate()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* About business Section */}
        <div className="container py-4 bg-lights box-shadow-2 mt-3">
          <div className="row">
            <div className="col">
              <p className="font-weight-bold text-left">About {this.state.data.name}</p>
            </div>
          </div>
          <div className="row">
            <div className="col px-5">
              <p className="text-left">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni maxime, aut blanditiis odit dolores excepturi molestiae! Non iste voluptatum omnis sed eius vitae provident suscipit, nihil esse. Amet, vel eum.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate, eum quam inventore soluta, obcaecati, perferendis dolorem cumque dignissimos autem corporis laborum repellendus? Doloribus ipsa ex natus vitae alias, cupiditate assumenda?
              </p>
            </div>
          </div>
        </div>

        {/* Business categories section */}
        <div className="container py-4 bg-lights box-shadow-2 mt-3">
          <div className="row">
            <div className="col">
              <p className="font-weight-bold text-left">Business categories</p>
            </div>
          </div>
          <div className="row">
            <div className="col px-5">
              <p className="text-left">
                <span class="badge badge-pill badge-light p-2">Web development</span>
                <span class="badge badge-pill badge-light p-2">Web design</span>
                <span class="badge badge-pill badge-light p-2">Engineering</span>

              </p>
            </div>
          </div>
        </div>

        {/* All Images Section */}
        <div className="container box-shadow-2 py-3 mt-3 bg-lights">
          <div className="row">
            <div className="col">
              <p className="font-weight-bold text-left">All photos</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col px-5">
              <div className="container">
                <div className="row">
                  {this.getImages()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getAvatar() {
    return {
      backgroundImage: `url(${this.state.avatar})`,
    };
  }

  getImages() {
    return this.state.images.map(image => {
      return (
        <React.Fragment>
          <div className="col-3" key={image.imageUrl}>
            <img src={image.imageUrl} alt={`image_${image.imageUrl}`} className="w-100" />
          </div>
        </React.Fragment>
      )
    })
  }

  getCreatedDate() {
    const date = new Date(this.state.data.createdAt);
    return date.toLocaleDateString();
  }
}

export default BusinessComponent;
