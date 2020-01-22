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

        <div className="container">
          <div className="row d-flex justify-content-end">
            <div className="col-3">
              <p>Created On</p>
              <p></p>
            </div>
            <div className="col-3">

            </div>
          </div>
        </div>

        {/* All Images Section */}
        <div className="container box-shadow py-3">
          <div className="row">
            <div className="col">
              <p className="font-weight-bold text-left">All photos</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col px-3">
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
}

export default BusinessComponent;
