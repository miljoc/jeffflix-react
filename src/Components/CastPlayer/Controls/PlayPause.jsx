import React from 'react';
import PropTypes from 'prop-types';
import { PlayerIcon } from 'react-player-controls';

import { PlayerButton } from './Styles';

const PlayPause = ({ isPaused, playPause }) => (
    <PlayerButton type="button" onClick={() => playPause()}>
        {isPaused ? (
            <PlayerIcon.Play width={22} height={22} fill="#FFF" />
        ) : (
            <PlayerIcon.Pause width={22} height={22} fill="#FFF" />
        )}
    </PlayerButton>
);

PlayPause.propTypes = {
    isPaused: PropTypes.bool.isRequired,
    playPause: PropTypes.func.isRequired,
};

export default PlayPause;
