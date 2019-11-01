// @flow
import React from 'react';

import InviteItem from 'Components/Admin/Users/InviteItem';

import * as S from './Styles';

type Invite = {
    code: number,
};
type Props = {
    invites: Array<Object<Invite>>,
};

const RenderInvites = ({ invites }: Props) => {
    const renderedInvites = invites.map((i) => <InviteItem key={i.code} code={i.code} />);

    return (
        <S.List>
            <S.ListHeading>Invites</S.ListHeading>
            {renderedInvites}
        </S.List>
    );
};

export default RenderInvites;
