// @flow
import React from 'react';
import { AlertConfirmWrap } from './Styles';

type Props = {
    type: string,
    confirm: Function,
    message: string,
};

const AlertConfirm = ({ type, confirm, message }: Props) => (
    <AlertConfirmWrap type={type}>
        <p>{message}</p>
        <button type="submit" onClick={() => confirm()}>Yes</button>
    </AlertConfirmWrap>
);


export default AlertConfirm;
