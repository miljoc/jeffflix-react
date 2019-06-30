import React from 'react';
import PropTypes from 'prop-types';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { PlayerButtonSmall, PlayerIcon } from './Styles';

const ForwardThirty = ({ seek, playstate }) => (
    <PlayerButtonSmall type="button" onClick={() => seek(playstate.playtime + 30)}>
        <PlayerIcon icon={faRedo} />
    </PlayerButtonSmall>
);

ForwardThirty.propTypes = {
    seek: PropTypes.func.isRequired,
};

export default ForwardThirty;
