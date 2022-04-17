import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { showModal, MATCH_MODAL } from 'Redux/Actions/modalActions';

import { HeaderIconWrap } from './Styles';

const MediaMatch = ({ uuid, sModal, file, type, name }) => {
    const toggleModal = () => {
        sModal(MATCH_MODAL, {
            uuid,
            file,
            type,
            name
        });
    };

    return (
        <HeaderIconWrap onClick={() => toggleModal()}>
            <small>{file}</small>
        </HeaderIconWrap>
    );
};

MediaMatch.propTypes = {
    sModal: PropTypes.func.isRequired,
    uuid: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    file: PropTypes.string,
};

MediaMatch.defaultProps = {
    file: null,
};

const mapDispatchToProps = (dispatch) => ({
    sModal: (type, props) => dispatch(showModal(type, props)),
});

export default connect(
    null,
    mapDispatchToProps,
)(MediaMatch);
