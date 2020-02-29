import React from 'react';
import './widget.styles.scss';

export default function (props) {
    const { customStyle } = props;

    return customStyle ? (<div className="spinner">
            <div className="double-bounce1" style={customStyle}></div>
            <div className="double-bounce2" style={customStyle}></div>
        </div>) : (<div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
        </div>)
}