// @flow
import React from 'react';

import * as S from './Styles';

type Props = {
    generateInvite: Function,
    loading: boolean,
};

const CreateInvite = ({ generateInvite, loading }: Props) => (
    <S.GenerateInvite onClick={() => generateInvite()} disabled={loading}>
        Nieuwe Uitnodiging
    </S.GenerateInvite>
);

export default CreateInvite;
