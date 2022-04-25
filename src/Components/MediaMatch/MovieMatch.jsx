import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { showModal, MATCH_MODAL } from 'Redux/Actions/modalActions';
import { MovieMatch as MovieMatchWrap } from './Styles';

const MovieMatch = ({ uuid, sModal, file, type, name }) => {
    const toggleModal = () => {
        sModal(MATCH_MODAL, {
            uuid,
            file,
            type,
            name
        });
    };

    return (
        <MovieMatchWrap onClick={() => toggleModal()}>
            <small>{file}</small>
        </MovieMatchWrap>
    );
};

MovieMatch.propTypes = {
    sModal: PropTypes.func.isRequired,
    uuid: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    file: PropTypes.string,
};

MovieMatch.defaultProps = {
    file: null,
};

const mapDispatchToProps = (dispatch) => ({
    sModal: (type, props) => dispatch(showModal(type, props)),
});

export default connect(
    null,
    mapDispatchToProps,
)(MovieMatch);
