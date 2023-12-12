// @flow
import React from 'react';
import { useAlert } from 'react-alert';

import { copyToClipboard , getFQDNUrl } from 'Helpers';

import { faCopy } from '@fortawesome/free-regular-svg-icons';
import ReactTooltip from 'react-tooltip';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { UserListItem, CopyInvite, CopyInviteWrap } from './Styles';

type Props = {
    code: string,
};

const InviteItem = ({ code }: Props) => {
    const alert = useAlert();

    const handleClick = () => {
        copyToClipboard(code);
        alert.success('Uitnodiging naar klembord gekopieerd');
    };

    const handleURLClick = () => {
        copyToClipboard(`${getFQDNUrl()}/#/register?inviteCode=${code}`);
        alert.success('UitnodigingsURL naar klembord gekopieerd');
    }

    return (
        <UserListItem>
            <ReactTooltip effect="solid" place="right" className="tooltip" delayShow={1000} />
            {code}
            <CopyInviteWrap data-tip="Kopieer uitnodigingscode" onClick={() => handleClick()}>
                <CopyInvite icon={faCopy} />
            </CopyInviteWrap>
            <CopyInviteWrap data-tip="Kopieer uitnodigingsURL" onClick={() => handleURLClick()}>
                <CopyInvite icon={faGlobe} />
            </CopyInviteWrap>
        </UserListItem>
    );
};

export default InviteItem;
