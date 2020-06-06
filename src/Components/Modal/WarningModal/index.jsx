// @flow
import React from 'react';
import { useDispatch } from 'react-redux';

import { hideModal } from 'Redux/Actions/modalActions';

import { Modal, ModalWrap, ModalBody, ModalHeader, ModalHeading } from 'Components/Modal/Styles';
import ModalClose from '../ModalClose';

import { Message, Button } from './Styles';

type OwnProps = {
    title: string,
    message: string,
    confirm: Function,
};

type Props = {
    ...OwnProps
};

const WarningModal = ({ title, message, confirm }: Props) => {
    const dispatch = useDispatch();
    const onConfirm = () => {
        confirm();
        dispatch(hideModal());
    };

    return (
        <Modal>
            <ModalWrap>
                <ModalHeader>
                    <ModalHeading>
                        {title}
                        <ModalClose onClick={() => dispatch(hideModal())} />
                    </ModalHeading>
                </ModalHeader>
                <ModalBody>
                    <Message>{message}</Message>
                    <Button type="button" onClick={() => dispatch(hideModal())}>
                        Cancel
                    </Button>
                    <Button confirm type="button" onClick={() => onConfirm()}>
                        Confirm
                    </Button>
                </ModalBody>
            </ModalWrap>
        </Modal>
    );
};

export default WarningModal;
