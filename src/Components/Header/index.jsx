import React, { Component } from 'react';
import { compose } from 'lodash/fp';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import Logout from './Logout';
import NavToggle from './NavToggle';
import Search from './Search';

import { HeaderWrap, BackButton, BackIcon } from './Styles';

class Header extends Component {
  state = {
    value: '',
  }

  updateSearch = (value) => {
    this.setState({
      value,
    });
  };

  startCast = () => {
    const sessionRequest = new chrome.cast.SessionRequest('EA238E27');
    const onSuccess = () => console.log('success');
    const onFailure = () => console.log('failure');
    const message = { jwt: 'token' };
    const namespace = 'urn:x-cast:com.jtw';

    chrome.cast.requestSession(function onRequestSessionSuccess(session) {
      console.log('Session success', session)
      cast.session = session
      cast.session.sendMessage(namespace, message, onSuccess, onFailure);
    }, function onLaunchError(er) {
      console.log('onLaunchError', er)
    }, sessionRequest);
  }

  render() {
    const { value } = this.state;
    const {
      history,
      previousLocation,
      currentLocation,
    } = this.props;

    return (
      <HeaderWrap>
        <NavToggle />
        { previousLocation !== null && currentLocation !== '/dashboard'
          && (
            <BackButton onClick={() => history.goBack()}>
              <BackIcon icon={faArrowLeft} />
            </BackButton>
          )
        }

        <span onClick={() => this.startCast()}>Cast</span>
        <Search value={value} updateSearch={this.updateSearch} />
        <Logout />
      </HeaderWrap>
    );
  }
}

Header.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  previousLocation: PropTypes.string,
  currentLocation: PropTypes.string,
};

Header.defaultProps = {
  previousLocation: '',
  currentLocation: '',
};

const mapStateToProps = (state) => {
  const { historyLocation } = state;
  return {
    previousLocation: historyLocation.previousLocation,
    currentLocation: historyLocation.currentLocation,
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, null),
)(Header);
