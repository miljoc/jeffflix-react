import React from 'react';
import PropTypes from 'prop-types';
import { PlayerIcon } from 'react-player-controls';

import { ThemeColors } from 'Styles/Variables';
import { PlayerButtonSmall } from './Styles';

const MuteUnmute = ({ isMuted, muteUnmute }) => (
    <PlayerButtonSmall type="button" onClick={() => muteUnmute()}>
        {isMuted ? (
            <PlayerIcon.SoundOff width={22} height={22} fill={ThemeColors.primary} />
        ) : (
            <PlayerIcon.SoundOn width={22} height={22} fill={ThemeColors.primary} />
        )}
    </PlayerButtonSmall>
);

MuteUnmute.propTypes = {
    isMuted: PropTypes.bool,
    muteUnmute: PropTypes.func.isRequired,
};

MuteUnmute.defaultProps = {
    isMuted: false,
};

export default MuteUnmute;
