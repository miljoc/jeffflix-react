import React from 'react';
import PropTypes from 'prop-types';
import { faStop } from '@fortawesome/free-solid-svg-icons';
import { PlayerButtonSmall, PlayerIcon } from './Styles';

const Stop = ({ stop }) => (
    <PlayerButtonSmall type="button" onClick={() => stop()}>
        <PlayerIcon icon={faStop} />
    </PlayerButtonSmall>
);

Stop.propTypes = {
    stop: PropTypes.func.isRequired,
};

export default Stop;
