// @flow
import React from 'react';
import { useQuery } from 'react-apollo';

import FETCH_USERS from 'Queries/fetchUserList';

import Loading from 'Components/Loading';
import UserItem from 'Components/Admin/Users/UserItem';

import { ErrorWrap } from 'Components/Error/Styles';
import * as S from './Styles';

const RenderUsers = () => {
    const { loading, error, data } = useQuery(FETCH_USERS, {
        fetchPolicy: 'cache-and-network',
    });

    if (loading) return <Loading />;
    if (error) return <ErrorWrap style={{ marginLeft: '1rem' }}>{`Error! ${error.message}`}</ErrorWrap>;

    return (
        <S.List>
            <S.ListHeading>Userlist</S.ListHeading>
            {data.users.map((u) => <UserItem key={u.id} username={u.username} id={u.id} admin={u.admin} />)}
        </S.List>
    );
};

export default RenderUsers;
