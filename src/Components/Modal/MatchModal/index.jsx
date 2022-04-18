import React from 'react';
import { connect } from 'react-redux';
import { splitFilepath } from 'Helpers';
import PropTypes from 'prop-types';

import { hideModal } from 'Redux/Actions/modalActions';

import * as S from 'Components/Modal/Styles';
import MediaMatch from 'Components/MediaMatch';
import ModalClose from '../ModalClose';

const MatchModal = ({ uuid, name, file, type, hModal }) => {

    return (
        <S.Modal>
            <S.ModalWrap>
                <S.ModalHeader>
                    <S.ModalHeading>
                        Match Movie
                        <ModalClose onClick={() => hModal()} />
                    </S.ModalHeading>

                    {file && (
                        <p>
                            <span>Location:</span> {splitFilepath(file)}
                        </p>
                    )}
                </S.ModalHeader>
                <S.ModalBody>
                    <MediaMatch uuid={uuid} type={type.toLowerCase()} name={name} />
                </S.ModalBody>
            </S.ModalWrap>
        </S.Modal>
    );
};

MatchModal.propTypes = {
    hModal: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
    file: PropTypes.string,
};

MatchModal.defaultProps = {
    file: null,
};

const mapDispatchToProps = (dispatch) => ({
    hModal: () => dispatch(hideModal()),
});

export default connect(
    null,
    mapDispatchToProps,
)(MatchModal);
