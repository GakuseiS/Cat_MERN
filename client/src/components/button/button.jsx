import React from 'react';
import classNames from 'classnames';
import propTypes from 'prop-types';
import './button.scss';

const Button = (props) => {
    const classes = classNames({
        'button': true,
        [`button-${props.size}`]: props.size,
        [`button-${props.color}`]: props.color,
        [`button-${props.page}`]: props.page
    });
    return (
        <button className={classes}>{props.children}</button>
    )
}

Button.propTypes = {
    size: propTypes.string,
    color: propTypes.string,
    page: propTypes.string
}

Button.defaultProps = {
    size: 'medium',
    color: 'green',
    page: ''
}

export default Button;