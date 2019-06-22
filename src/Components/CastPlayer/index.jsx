/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PlayerControls from './controls';
import { castStatusCheck } from './castActions';
import { convertToHMS } from 'Helpers';

import { CastPlayerWrap } from './Styles';

class CastPlayer extends Component {
    componentDidMount() {
        this.checkStatus();
    }

    checkStatus = () => {
        const { isCasting, isPlaying } = this.props;

        setTimeout(() => {
            castStatusCheck(isCasting, isPlaying);
        }, 1000);
    };

    render() {
        const { isCasting, isPlaying, metadata, playstate } = this.props;

        if (isCasting && isPlaying) {
            return (
                <CastPlayerWrap>
                    <p>Currently Playing: {metadata.name}</p>
                    <p>
                        {convertToHMS(playstate.playtime)}/{convertToHMS(playstate.total)}
                    </p>
                    <button onClick={() => PlayerControls.playOrPause()}>Play / Pause</button>
                    <button onClick={() => PlayerControls.muteOrUnmute()}>Mute / Unmute</button>
                    <button onClick={() => PlayerControls.stop()}>Stop</button>
                </CastPlayerWrap>
            );
        }

        return null;
    }
}

CastPlayer.propTypes = {
    isCasting: PropTypes.bool.isRequired,
    isPlaying: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    const { cast } = state;

    return {
        isCasting: cast.connected,
        isPlaying: cast.playing,
        metadata: cast.metadata,
        playstate: cast.playstate,
    };
};

export default connect(
    mapStateToProps,
    null,
)(CastPlayer);
