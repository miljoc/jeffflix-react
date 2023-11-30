import React from 'react';
import PropTypes from 'prop-types';
import placeholder from './placeholder.png';

import * as S from './Styles';

const Placeholder = ({ wide, wideLibrary }) => 
    <S.Placeholder src={placeholder} wideLibrary={wideLibrary} wide={wide} alt="Laden..." />;

Placeholder.propTypes = {
    wide: PropTypes.bool,
    wideLibrary: PropTypes.bool
};

Placeholder.defaultProps = {
    wide: false,
    wideLibrary: false
}

export { Placeholder, placeholder };
