// @flow
import React from 'react';
import { connect } from 'react-redux';

import AddLibraryModal from 'Components/Modal/AddLibraryModal';
import ResumeMediaModal from 'Components/Modal/ResumeMediaModal';
import WarningModal from 'Components/Modal/WarningModal';
import FixMismatchModal from 'Components/Modal/FixMismatchModal';
import AdvancedInfoModal from 'Components/Modal/AdvancedInfoModal';
import MatchModal from 'Components/Modal/MatchModal';
import GenericModal from 'Components/Modal/GenericModal';

import {
    LIBRARY_MODAL,
    RESUME_MODAL,
    WARNING_MODAL,
    FIX_MISMATCH_MODAL,
    MATCH_MODAL,
    ADVANCED_INFO_MODAL,
    GENERIC_MODAL
} from 'Redux/Actions/modalActions';

const MODAL_COMPONENTS = {
    [LIBRARY_MODAL]: AddLibraryModal,
    [RESUME_MODAL]: ResumeMediaModal,
    [WARNING_MODAL]: WarningModal,
    [FIX_MISMATCH_MODAL]: FixMismatchModal,
    [MATCH_MODAL]: MatchModal,
    [ADVANCED_INFO_MODAL]: AdvancedInfoModal,
    [GENERIC_MODAL]: GenericModal,
};

type OwnProps = {
    type: string,
    props: Object,
};

type Props = {
    ...OwnProps
}

const ModalContainer = ({ type, props }: Props) => {
    if (!type) {
        return null;
    }

    const Modal = MODAL_COMPONENTS[type];

    // eslint-disable-next-line
    return <Modal {...props} />;
};

const mapStateToProps = (state) => ({
    type: state.modal.type,
    props: state.modal.props,
});

export default connect<Props, OwnProps, *, *, *, *>(mapStateToProps)(ModalContainer);
