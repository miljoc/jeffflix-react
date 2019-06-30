import React from 'react';
import PropTypes from 'prop-types';
import { PlayerIcon } from 'react-player-controls';

import { PlayerButtonSmall } from './Styles';

const MuteUnmute = ({ isMuted, muteUnmute }) => (
    <PlayerButtonSmall type="button" onClick={() => muteUnmute()}>
        {isMuted ? (
            <PlayerIcon.SoundOff width={22} height={22} fill="#FFF" />
        ) : (
            <PlayerIcon.SoundOn width={22} height={22} fill="#FFF" />
        )}
    </PlayerButtonSmall>
);

MuteUnmute.propTypes = {
    isMuted: PropTypes.bool.isRequired,
    muteUnmute: PropTypes.func.isRequired,
};

export default MuteUnmute;
