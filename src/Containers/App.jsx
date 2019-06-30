import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Auth, checkAuth } from 'Client/Auth';

import ContentWrap from 'Containers/ContentWrap';
import Header from 'Components/Header';
import Sidebar from 'Components/Sidebar';
import Routes from 'Routes';
import ModalContainer from 'Containers/ModalContainer';
import CastPlayer from 'Components/CastPlayer';

import { AppWrap } from './Styles';

const App = ({ castPlaying }) => {
    checkAuth();

    const LoggedIn = () => (
        <Fragment>
            <Sidebar />
            <ContentWrap>
                <Fragment>
                    <Header />
                    <Routes />
                </Fragment>
            </ContentWrap>
            <ModalContainer />
            <CastPlayer />
        </Fragment>
    );

    return (
        <AppWrap authed={Auth.isAuthenticated} castPlaying={castPlaying}>
            {Auth.isAuthenticated ? (
                <LoggedIn />
            ) : (
                <Fragment>
                    <Routes />
                    <CastPlayer />
                </Fragment>
            )}
        </AppWrap>
    );
};
const mapStateToProps = (state) => {
    const { cast } = state;

    return {
        castPlaying: cast.playing,
    };
};

App.propTypes = {
    castPlaying: PropTypes.bool.isRequired,
};

export default withRouter(connect(mapStateToProps)(App));
