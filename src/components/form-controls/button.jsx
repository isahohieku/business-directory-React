import React from 'react';

const Button = (props) => (
    <button
        type={props.type}
        className={props.className}
        onClick={props.handleClick}
        disabled={props.loading}
    >
        {props.label} 
        {props.loading ? <i className="fas fa-spinner fa-spin ml-2"></i> : ''}
    </button>
)

export { Button }