import React from 'react';
import PropTypes from 'prop-types';
// import Icon from 'Images/logo-icon.svg';
import Icon from 'Images/full-logo.svg';

const LogoIcon = ({ alt, height }) => (
    <img src={Icon} alt={alt} height={`${height}px`} />
);

LogoIcon.propTypes = {
    alt: PropTypes.string,
    height: PropTypes.string,
};

LogoIcon.defaultProps = {
    alt: 'Jeffflix',
    height: '150',
};

export default LogoIcon;
