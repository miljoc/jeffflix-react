// @flow
import React from 'react';
import { connect } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';

import DELETE_USER from 'Mutations/deleteUser';

import { showModal, hideModal, WARNING_MODAL } from 'Redux/Actions/modalActions';

import { faTrash, faCrown } from '@fortawesome/free-solid-svg-icons';
import * as S from './Styles';

type Props = {
    username: string,
    id: number,
    admin: boolean,
    hModal: Function,
    sModal: Function
};

const UserItem = ({ sModal, hModal, username, id, admin }: Props) => {
    const [deleteUser, { data }] = useMutation(DELETE_USER);

    const title = "Delete user";
    const message = `Are you sure you want to delete the user '${username}'?`;
    const confirm = () => {
        hModal();
        deleteUser({ variables: { id } });
    };
    const cancel = () => hModal();

    const toggleModal = () => {
        sModal(WARNING_MODAL, {
            title,
            message,
            confirm,
            cancel,
        });
    };

    return (
        <S.UserListItem success={typeof data !== 'undefined'}>
            {data && `Successfully Deleted`} {username} {admin && <S.AdminUser icon={faCrown} />}
            {!data && !admin && <S.DeleteUser onClick={() => toggleModal()} icon={faTrash} />}
        </S.UserListItem>
    );
};

const mapDispatchToProps = (dispatch) => ({
    sModal: (type, props) => dispatch(showModal(type, props)),
    hModal: () => dispatch(hideModal()),
});

export default connect(
    null,
    mapDispatchToProps,
)(UserItem);
