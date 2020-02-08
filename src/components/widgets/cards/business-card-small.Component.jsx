import React from 'react';
import { useHistory } from 'react-router-dom';
import '../../admin-dashboard/dashboard.style.scss';
import DeleteModal from '../../modals/delete-business.component';

export default function SmallBusinessCard(props) {
    const { data } = props;
    const history = useHistory();



    const getImage = () => {
        if (data && data.images && data.images[0]) {
            return {
                backgroundImage: `url(${data.images[0].imageUrl})`,
            };
        }
    }

    const getName = () => {
        if (data && data.name) {
            return data.name;
        }
    }

    const getCategories = () => {
        if (data && data.categories.length) {
            return (
                data.categories.map(item => <span key={`${item.name}`} className="badge badge-pill badge-light p-2 mx-1 my-1 d-inline-block text-smaller">{item.name}</span>)
            )
        }
    }

    const addDeleteButton = () => {
        if (history.location.pathname === '/app/businesses') {
            return (<DeleteModal id={data.id} name={data.name} deleted={(id) => props.handleDeleteBusiness(id)} />)
        }
        return '';
    }

    return (
        <React.Fragment>
            <div className="container small-card-wrapper pb-3">
                <div className="row">
                    <div className="col px-0">
                        <div className="d-flex justify-content-between">
                            <p className="text-left text-light my-2 pl-3">{getName()}</p>
                            {/* delete modal */}
                            {addDeleteButton()}
                        </div>
                        <div className="image-holder" style={getImage()}></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col px-0">
                        <hr className="mt-3" />
                    </div>
                </div>
                <div className="row">
                    <div className="col text-left">
                        {getCategories()}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}