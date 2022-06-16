// @flow
import React from 'react';
import { useDispatch } from 'react-redux';
import { hideModal } from 'Redux/Actions/modalActions';
import { Modal, ModalWrap, ModalBody, ModalHeader, ModalHeading } from 'Components/Modal/Styles';
import parse from 'html-react-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalClose from '../ModalClose';
import { Message } from './Styles';

type OwnProps = {
    title: string,
    message: string,
    confirm: Function,
};

type Props = {
    ...OwnProps
};

const GenericModal = ({ title, message, icon }: Props) => {
    const dispatch = useDispatch();

    return (
        <Modal>
            <ModalWrap>
                <ModalHeader>
                    <ModalHeading>
                        {icon && <FontAwesomeIcon icon={icon} />}
                        {title}
                        <ModalClose onClick={() => dispatch(hideModal())} />
                    </ModalHeading>
                </ModalHeader>
                <ModalBody>
                    <Message>{parse(message)}</Message>
                </ModalBody>
            </ModalWrap>
        </Modal>
    );
};

export default GenericModal;
