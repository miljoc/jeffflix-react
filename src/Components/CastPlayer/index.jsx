/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PlayerControls from './controls';
import { setCastStatus, setCastPlayingStatus } from 'Redux/Actions/castActions';

import { CastPlayerWrap } from './Styles';

class CastPlayer extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.castReciever();
            this.checkStatus();
        }, 200);
    }

    checkStatus = () => {
        const { setCastStatus, setCastPlayingStatus } = this.props;
        const castContext = cast.framework.CastContext.getInstance();

        if (castContext.getCastState() === 'CONNECTED') {
            setCastStatus(true);

            if (castContext.getCurrentSession().getMediaSession()) {
                setCastPlayingStatus(true);
            }
        }
    };

    castReciever = () => {
        if (typeof cast === 'undefined') return false;

        const { setCastStatus, setCastPlayingStatus, isPlaying } = this.props;

        const framework = cast.framework;
        const eventType = framework.RemotePlayerEventType;
        const playerController = new framework.RemotePlayerController(
            new framework.RemotePlayer(),
        );

        playerController.addEventListener(eventType.IS_CONNECTED_CHANGED, function(e) {
            setCastStatus(e.value);
        });

        playerController.addEventListener(eventType.IS_MEDIA_LOADED_CHANGED, function(e) {
            setCastPlayingStatus(e.value);
        });

        playerController.addEventListener(eventType.DURATION_CHANGED, function(e) {
            if (!isPlaying) setCastPlayingStatus(true);
        });
    };

    render() {
        const { isCasting, isPlaying } = this.props;

        if (isCasting && isPlaying) {
            return (
                <CastPlayerWrap>
                    <button onClick={() => PlayerControls.playOrPause()}>
                        Play / Pause
                    </button>
                    <button onClick={() => PlayerControls.muteOrUnmute()}>
                        Mute / Unmute
                    </button>
                    <button onClick={() => PlayerControls.stop()}>Stop</button>
                </CastPlayerWrap>
            );
        } else if (isCasting && !isPlaying) {
            return (
                <CastPlayerWrap>
                    <p>Select Media To Play</p>
                </CastPlayerWrap>
            );
        }

        return null;
    }
}

CastPlayer.propTypes = {
    setCastStatus: PropTypes.func.isRequired,
    setCastPlayingStatus: PropTypes.func.isRequired,
    isCasting: PropTypes.bool.isRequired,
    isPlaying: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    const { cast } = state;

    return {
        isCasting: cast.connected,
        isPlaying: cast.playing,
    };
};

const mapDispatchToProps = (dispatch) => ({
    setCastStatus: (status) => dispatch(setCastStatus(status)),
    setCastPlayingStatus: (status) => dispatch(setCastPlayingStatus(status)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CastPlayer);
