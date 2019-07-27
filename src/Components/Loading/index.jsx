import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const LoadingSpinner = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.primary};
    font-size: ${(props) => props.fsize};
    position: ${(props) => (props.relative ? 'relative' : 'absolute')};
    top: 50%;
    left: 50%;
    margin-top: -${(props) => props.fsize.replace('rem', '') / 2}rem;
    margin-left: -${(props) => props.fsize.replace('rem', '') / 2}rem;
`;

const Loading = ({ relative, fsize }) => (
    <LoadingSpinner icon={faSpinner} spin relative={relative ? 1 : 0} fsize={fsize} />
);

Loading.propTypes = {
    relative: PropTypes.bool,
    fsize: PropTypes.string,
};

Loading.defaultProps = {
    relative: false,
    fsize: '1.8rem',
};

export default Loading;
