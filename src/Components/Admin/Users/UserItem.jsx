// @flow
import React from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import DELETE_USER from 'Mutations/deleteUser';
import { showModal, WARNING_MODAL } from 'Redux/Actions/modalActions';
import { faTrash, faCrown } from '@fortawesome/free-solid-svg-icons';
import { AdminUser, DeleteUser, DeleteUserWrap, UserListItem } from './Styles';

type Props = {
    username: string,
    id: number,
    admin: boolean,
};

const UserItem = ({ username, id, admin }: Props) => {
    const [deleteUser, { data }] = useMutation(DELETE_USER);
    const dispatch = useDispatch();

    const toggleModal = () => {
        dispatch(showModal(WARNING_MODAL, {
            title: 'Delete user',
            message: `Are you sure you want to delete the user '${username}'?`,
            confirm: () => deleteUser({ variables: { id } }),
        }));
    };

    return (
        <UserListItem success={typeof data !== 'undefined'}>
            {data && `Successfully Deleted`} {username} {admin && <AdminUser icon={faCrown} />}
            {!data && !admin && (
                <DeleteUserWrap data-tip="Delete User" onClick={() => toggleModal()}>
                    <DeleteUser icon={faTrash} />
                </DeleteUserWrap>
            )}
        </UserListItem>
    );
};

export default UserItem;
