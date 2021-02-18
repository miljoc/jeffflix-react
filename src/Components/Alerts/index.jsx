// @flow
import React from 'react';
import { transitions, positions } from 'react-alert';

import AlertIcon from './AlertIcon';
import AlertInline from './AlertInline';
import AlertConfirm from './AlertConfirm';

import * as S from './Styles';

type Props = {
    message: string,
    options: Object,
    close: Function,
};

const AlertOptions = {
    position: positions.BOTTOM_RIGHT,
    timeout: 5000,
    transition: transitions.SCALE,
    offset: '30',
};

const AlertTemplate = ({ message, options, close }: Props) => (
    <S.AlertWrap>
        <S.AlertMessage>{message}</S.AlertMessage>

        <S.IconWrap>{AlertIcon(options.type)}</S.IconWrap>
        <S.Close onClick={close}>×</S.Close>
    </S.AlertWrap>
);

export { AlertTemplate, AlertOptions, AlertInline, AlertConfirm };
