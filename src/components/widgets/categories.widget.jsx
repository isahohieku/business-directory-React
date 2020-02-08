import React from 'react';
import DeleteCategoryModal from '../modals/delete-category.component';
import './widget.styles.scss';

function CategoriesCard(props) {
    const { name, id } = props.data;
    return (
        <React.Fragment>
            <div className="card-wrapper-2">
                <div className="d-flex justify-content-end">
                    <button className="btn text-light">
                        <i className="fas fa-pen"></i>
                    </button>
                    {<DeleteCategoryModal id={id} name={name} deleted={(id) => props.handleDelete(id)} />}
                </div>
                <hr/>
                <div className="text-light px-4">
                    <h6 className="text-center py-4">{name}</h6>
                    <p className="font-weight-light text-right text-small pb-3">{20} Businesses</p>
                </div>
            </div>
        </React.Fragment>
    );
}

export default CategoriesCard;