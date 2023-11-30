import React from 'react';
import PropTypes from 'prop-types';

import { convertToMinutes, convertToMinutesSeconds } from 'Helpers';

import { faExclamation } from '@fortawesome/free-solid-svg-icons';

import MediaDescription from './MediaDescription';
import { MediaInfoWrap, MediaDetails, LibraryUnhealthy } from '../Styles';
import { MediaName, MediaRelease, MediaOriginalTitle } from '../../Styles';

const MediaInfo = (props) => {
    const { name, release, playState, selectedFile, overview, episodeNumber, title } = props;

    const renderPlayState = () => {
        let renderedState;

        if (playState.finished) {
            renderedState = 'Bekeken';
        } else if (playState.playtime < 60 && playState.playtime > 0) {
            renderedState = selectedFile.totalDuration < 60
                ? `${convertToMinutesSeconds(playState.playtime)} bekeken`
                : '< 1 minuut bekeken';
        } else if (!playState.finished && playState.playtime > 0) {
            renderedState = `${convertToMinutes(playState.playtime)} bekeken`;
        } else {
            renderedState = 'Nog niet gezien';
        }

        return renderedState;
    };

    const renderResolution = () => {
        const stream = selectedFile.streams.find((f) => f.resolution);
        if (!stream) return 'Onbekende Resolutie';

        const { resolution } = stream;

        return resolution;
    };

    const renderTotalD = () => {
        if (!selectedFile.totalDuration > 0) return 'Onbekend';

        return selectedFile.totalDuration < 60 
            ? convertToMinutesSeconds(selectedFile.totalDuration)
            : convertToMinutes(selectedFile.totalDuration);
    };

    const renderHealth = () => {
        if (!selectedFile.healthy) {
            return (
                <li className="warning" data-tip="This file is on an unhealthy library, playback may be broken.">
                    <LibraryUnhealthy icon={faExclamation} />
                    Warning
                </li>
            );
        }

        return false;
    };

    return (
        <MediaInfoWrap>
            <MediaName>
                {title || name}
                <MediaRelease>
                    {episodeNumber ? `Aflevering ${episodeNumber}` : release}
                </MediaRelease>
            </MediaName>

            {episodeNumber === null && name !== title &&
                <MediaOriginalTitle><span>original title</span>{name}</MediaOriginalTitle>
            }

            <MediaDetails unwatched={playState.finished}>
                {renderHealth()}
                <li>{renderTotalD()}</li>
                <li>{renderPlayState()}</li>
                <li>{renderResolution()}</li>
                {episodeNumber && <li>{release}</li>}
            </MediaDetails>
            
            <MediaDescription overview={overview} />
        </MediaInfoWrap>
    );
};

MediaInfo.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    overview: PropTypes.string.isRequired,
    release: PropTypes.string.isRequired,
    episodeNumber: PropTypes.number,
    playState: PropTypes.shape({
        finished: PropTypes.bool,
        playtime: PropTypes.number,
    }).isRequired,
    selectedFile: PropTypes.shape({
        totalDuration: PropTypes.number,
        healthy: PropTypes.bool,
        streams: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    }).isRequired,
};

MediaInfo.defaultProps = {
    episodeNumber: null,
    title: null,
};


export default MediaInfo;
