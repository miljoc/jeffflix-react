import React from 'react';
import PropTypes from 'prop-types';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { ModalCloseButton, ModalCloseWrap } from './Styles';

const ModalClose = ({ onClick }) => (
    <ModalCloseWrap onClick={onClick}>
        <ModalCloseButton icon={faTimes}>
        Close
        </ModalCloseButton>
    </ModalCloseWrap>
);

export default ModalClose;

ModalClose.propTypes = {
    onClick: PropTypes.func.isRequired,
};
