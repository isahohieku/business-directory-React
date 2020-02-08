import React from 'react';
import '../admin-dashboard/dashboard.style.scss';

function SummaryCard(props) {
    const { title, numbers } = props;
    return (
        <React.Fragment>
            <div className="card-wrapper d-flex align-items-center pl-4">
                <div className="text-light">
                    <h3 className="text-left">{numbers}</h3>
                    <p className="text-uppercase font-weight-bold text-left text-small">{title}</p>
                </div>
            </div>
        </React.Fragment>
    );
}

export default SummaryCard;