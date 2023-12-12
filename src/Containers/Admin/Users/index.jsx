// @flow
import React from 'react';
import { useMutation, useQuery } from '@apollo/client';

import CREATE_USER_INVITE from 'Mutations/createUserInvite';
import FETCH_INVITES from 'Queries/fetchInvites';

import { ErrorWrap } from 'Components/Error/Styles';
import * as S from 'Containers/Styles';
import { PageHeading } from 'Styles/Base';

import Loading from 'Components/Loading';
import CreateInvite from 'Components/Admin/Users/CreateInvite';
import RenderUsers from './RenderUsers';
import RenderInvites from './RenderInvites';

const Users = () => {
    const { loading, error, data } = useQuery(FETCH_INVITES);
    const [generateInvite, { loading: loadingInvite }] = useMutation(CREATE_USER_INVITE, {
        refetchQueries: [{ query: FETCH_INVITES }],
    });

    if (loading) return <Loading />;
    if (error) return (
        <S.InnerContent>
            <PageHeading>Gebruikersbeheer</PageHeading>
            <ErrorWrap>{`Uhooh! ${error.message}`}</ErrorWrap>
        </S.InnerContent>
    );

    const invites = data.invites.filter((i) => i.user === null);

    return (
        <S.InnerContent>
            <PageHeading>Gebruikersbeheer</PageHeading>
            <RenderUsers />
            {invites.length > 0 && <RenderInvites invites={invites} />}
            <CreateInvite generateInvite={() => generateInvite()} loading={loadingInvite} />
        </S.InnerContent>
    );
};

export default Users;
