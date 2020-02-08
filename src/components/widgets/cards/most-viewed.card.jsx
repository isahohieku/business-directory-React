import React from 'react';
import '../../admin-dashboard/dashboard.style.scss';

export default function MostViewedCard(props) {
    const { data } = props;

    const getImage = () => {
        if (data && data.images && data.images[0]) {
            return {
                backgroundImage: `url(${data.images[0].imageUrl})`,
            };
        }
    }

    const getName = () => {
        if (data && data.business.name) {
            return data.business.name;
        }
    }

    const getViews = () => {
        if (data && data.views) {
            return (
                <span key={`${data.views}`} className="badge badge-pill badge-warning p-2 mx-1 my-1 d-inline-block text-smaller">{data.views}</span>
                )
        }
    }

    return (
        <React.Fragment>
            <div className="container small-card-wrapper pb-3">
                <div className="row">
                    <div className="col px-0">
                        <p className="text-left text-light mt-2 pl-3">{getName()}</p>
                        <div className="image-holder" style={getImage()}></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col px-0">
                        <hr className="mt-3" />
                    </div>
                </div>
                <div className="row">
                    <div className="col text-right ">
                        <span className="text-light">Views</span> {getViews()}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}