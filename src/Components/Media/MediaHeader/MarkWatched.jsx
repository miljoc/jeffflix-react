import React, { useState } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import PropTypes from 'prop-types';

import { faCheckCircle as faCheckCircleSolid } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

import UPDATE_PLAYSTATE from 'Mutations/updatePlaystate';
import {
    updatePlayStateEpisode,
    updatePlayStateMovie,
    updatePlayStateSeason,
    updatePlayStateSeries,
} from 'Components/Media/Actions/updatePlayState';

import { HeaderIconWrap, HeaderIcon } from './Styles';

const MarkWatched = ({ episodes, playState, type, uuid, mutate }) => {
    const [watched, toggleWatched] = useState(playState.finished);

    const markMultipleWatched = () => {
        episodes.forEach((episode) => {
            if (type === 'series') {
                updatePlayStateSeries(mutate, uuid, episode.uuid, !watched);
            } else {
                updatePlayStateSeason(mutate, uuid, episode.uuid, !watched);
            }
        });
    };

    const toggleWatchedState = () => {
        switch (type) {
            case 'Episode':
                updatePlayStateEpisode(mutate, uuid, 0, !watched);
                break;
            case 'Movie':
                updatePlayStateMovie(mutate, uuid, 0, !watched);
                break;
            default:
                markMultipleWatched();
                break;
        }

        toggleWatched(!watched);
    };

    return (
        <HeaderIconWrap
            onClick={() => toggleWatchedState()}
            data-delay-show='1000'
            data-tip={watched ? `Markeer ${type} als niet gezien` : `Markeer ${type} als bekeken`}
        >
            <HeaderIcon icon={watched ? faCheckCircleSolid : faCheckCircle} />
        </HeaderIconWrap>
    );
};

MarkWatched.propTypes = {
    mutate: PropTypes.func.isRequired,
    playState: PropTypes.shape({
        finished: PropTypes.bool,
    }),
    episodes: PropTypes.arrayOf(
        PropTypes.shape({
            playState: PropTypes.shape({
                finished: PropTypes.bool.isRequired,
                playtime: PropTypes.number.isRequired,
            }),
            uuid: PropTypes.string.isRequired,
        }),
    ),
    type: PropTypes.string.isRequired,
    uuid: PropTypes.string,
};

MarkWatched.defaultProps = {
    playState: {},
    episodes: [],
    uuid: null,
};

export default graphql(UPDATE_PLAYSTATE)(MarkWatched);
