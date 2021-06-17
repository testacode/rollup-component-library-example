import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, ...rest }) => (<button type="button" {...rest}>{children}</button>);

const { string } = PropTypes;

Button.propTypes = {
  children: string.isRequired
};

export default Button;
