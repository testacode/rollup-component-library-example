import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  align-items: center;
  background: radial-gradient(circle, rgba(0,213,255,1) 0%, rgba(9,9,121,1) 100%);
  border-radius: 50%;
  color: white;
  display: inline-flex;
  font-weight: 500;
  height: 50px;
  justify-content: center;
  width: 50px;
`;

const getInitials = (string) => {
  const names = string.split(' ');
  const initials = names.map(
    (name) => name
      .charAt(0)
      .toUpperCase()
  );
  if (initials.length > 1) {
    return `${initials[0]}${initials[initials.length - 1]}`;
  }
  return initials[0];
};

const Avatar = ({ children }) => {
  let initials = 'Some Guy';

  if (children) {
    initials = getInitials(children);
  }

  return (
    <StyledWrapper>{initials}</StyledWrapper>
  );
};

const { string } = PropTypes;

Avatar.propTypes = {
  children: string
};

Avatar.defaultProps = {
  children: undefined
};

export default Avatar;
