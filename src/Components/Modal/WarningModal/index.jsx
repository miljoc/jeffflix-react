// @flow
import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'Redux/Actions/modalActions';

import { Modal, ModalWrap, ModalBody, ModalHeader, ModalHeading } from 'Components/Modal/Styles';
import ModalClose from '../ModalClose';

import { Message, Button } from './Styles';

type OwnProps = {
    title: string,
    message: string,
    confirm: Function,
    cancel: Function,
};

type Props = {
    ...OwnProps,
    hModal: Function,
};

const WarningModal = ({ hModal, title, message, confirm, cancel }: Props) => (
    <Modal>
        <ModalWrap>
            <ModalHeader>
                <ModalHeading>
                    {title}
                    <ModalClose onClick={() => hModal()} />
                </ModalHeading>
            </ModalHeader>
            <ModalBody>
                <Message>{message}</Message>
                <Button type="button" onClick={() => cancel()}>
                    Cancel
                </Button>
                <Button confirm type="button" onClick={() => confirm()}>
                    Confirm
                </Button>
            </ModalBody>
        </ModalWrap>
    </Modal>
);

const mapDispatchToProps = (dispatch) => ({
    hModal: () => dispatch(hideModal()),
});

export default connect<Props, OwnProps, *, *, *, *>(null, mapDispatchToProps)(WarningModal);
