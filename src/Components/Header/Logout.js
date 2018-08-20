import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router-dom';

import { faSignOut } from '@fortawesome/pro-regular-svg-icons';

import { Auth } from 'Client/Auth';
import { LogoutButton, LogoutIcon } from './Styles';

class Logout extends Component {
    _handleLogout = () => {
      const cookies = new Cookies();
      cookies.remove('jwt', { path: '/' });

      Auth.logout();
      this.props.history.push('/login');
    }

    render() {
      return (
        <LogoutButton onClick={this._handleLogout}>
          <LogoutIcon icon={faSignOut} />
        </LogoutButton>
      );
    }
}

export default withRouter(Logout);
