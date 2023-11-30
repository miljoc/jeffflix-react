import React from 'react';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { Auth } from 'Client/Auth';
import { NavButton } from 'Styles/Button';
import { NavIcon } from './Styles';

const Logout = () => (
    <NavButton data-delay-show='1000' data-tip="Uitloggen" onClick={() => Auth.logout()}>
        <NavIcon icon={faSignOutAlt} />
    </NavButton>
);

export default Logout;
