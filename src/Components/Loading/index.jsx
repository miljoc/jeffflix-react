import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const LoadingSpinner = styled(FontAwesomeIcon)`
    color: ${props => props.theme.primary};
    font-size: ${props => props.size};
    position: ${(props => (props.relative ? 'relative' : 'absolute'))};
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
`;

const Loading = ({ relative, size }) => (
  <LoadingSpinner icon={faSpinner} spin relative={relative ? 1 : 0} size={size} />
);

Loading.propTypes = {
  relative: PropTypes.bool,
  size: PropTypes.string,
};

Loading.defaultProps = {
  relative: false,
  size: '1.8rem',
};

export default Loading;
