import React from 'react';
import { connect } from 'react-redux';
import { splitFilepath } from 'Helpers';
import PropTypes from 'prop-types';

import { hideModal } from 'Redux/Actions/modalActions';

import FixMismatch from 'Components/FixMismatch';

import * as S from 'Components/Modal/Styles';
import ModalClose from '../ModalClose';

const FixMismatchModal = ({ uuid, name, file, type, hModal }) => {
    return (
        <S.Modal>
            <S.ModalWrap>
                <S.ModalHeader>
                    <S.ModalHeading>
                        Fix Mismatch: {name}
                        <ModalClose onClick={() => hModal()} />
                    </S.ModalHeading>

                    {file && (
                        <p>
                            <span>Location:</span> {splitFilepath(file)}
                        </p>
                    )}
                </S.ModalHeader>
                <S.ModalBody>
                    <FixMismatch uuid={uuid} type={type.toLowerCase()} name={name} />
                </S.ModalBody>
            </S.ModalWrap>
        </S.Modal>
    );
};

FixMismatchModal.propTypes = {
    hModal: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
    file: PropTypes.string,
};

FixMismatchModal.defaultProps = {
    file: null,
};

const mapDispatchToProps = (dispatch) => ({
    hModal: () => dispatch(hideModal()),
});

export default connect(
    null,
    mapDispatchToProps,
)(FixMismatchModal);
