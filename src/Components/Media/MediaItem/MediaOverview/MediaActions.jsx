import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { graphql } from 'graphql';

import UPDATE_PLAYSTATE from 'Mutations/updatePlaystate';
import {
    updatePlayStateEpisode,
    updatePlayStateMovie,
} from 'Components/Media/Actions/updatePlayState';

import { MediaActionsWrap } from '../Styles';

class MediaActions extends Component {
    toggleWatchedState = () => {
        const { playState, type, uuid, mutate } = this.props;

        if (type === 'Episode') {
            updatePlayStateEpisode(mutate, uuid, 0, !playState.finished);
        } else {
            updatePlayStateMovie(mutate, uuid, 0, !playState.finished);
        }
    };

    playText = () => {
        const { isConnected, playState } = this.props;
        const resume = playState.playtime > 0;

        if (isConnected) {
            return 'Cast';
        }

        if (resume) {
            return 'Speel vanaf begin';
        }

        return 'Speel';
    };

    render() {
        const { playState, playMedia } = this.props;
        const resume = playState.playtime > 0;

        return (
            <MediaActionsWrap>
                <button type="button" onClick={() => playMedia(false)}>
                    {this.playText()}
                </button>

                {resume && (
                    <button type="button" onClick={() => playMedia(true)}>
                        Hervat
                    </button>
                )}

                <button type="button" onClick={() => this.toggleWatchedState()}>
                    {playState.finished ? 'Markeer Als Onbekeken' : 'Markeer Als Bekeken'}
                </button>
            </MediaActionsWrap>
        );
    }
}

MediaActions.propTypes = {
    uuid: PropTypes.string.isRequired,
    mutate: PropTypes.func.isRequired,
    playState: PropTypes.shape({
        finished: PropTypes.bool,
        playtime: PropTypes.number,
    }).isRequired,
    isConnected: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    playMedia: PropTypes.func.isRequired,
};

export default graphql(UPDATE_PLAYSTATE)(MediaActions);
