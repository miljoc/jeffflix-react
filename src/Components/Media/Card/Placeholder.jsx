import React from 'react';
import PropTypes from 'prop-types';
import placeholder from './placeholder.png';

import * as S from './Styles';

const Placeholder = ({ wide }) => <S.Placeholder src={placeholder} wide={wide} alt="Loading..." />;

Placeholder.propTypes = {
    wide: PropTypes.bool
};

Placeholder.defaultProps = {
    wide: false
}

export { Placeholder, placeholder };
