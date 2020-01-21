import React from 'react';
import PropTypes from 'prop-types';

const FormControl = ({
    name,
    type,
    placeholder,
    onChange,
    className,
    value,
    error,
    children,
    label,
    ...props
}) => {

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col px-0 d-flex justify-content-between">
                        <label htmlFor={name} className="text-left mb-0">{label}</label>
                        {error && <p className="text-danger text-small mb-0">{error}</p>}
                    </div>
                </div>
            </div>
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className={className}
                style={error && { border: 'solid 1px red' }}
            />
        </React.Fragment>
    )
}

FormControl.defaultProps = {
    type: "text",
    className: ""
}

FormControl.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'email', 'number', 'password']),
    className: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired
}

export { FormControl }
