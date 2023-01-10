import React from 'react';
import PropTypes from 'prop-types';

import MediaInfo from './MediaInfo';
import MediaFiles from './MediaFiles';
import MediaSubtitles from './MediaSubtitles';
import MediaAudio from './MediaAudio';
import MediaLinks from './MediaLinks';

const MediaOverview = (props) => {
    const { mediaInfo, selectedFile, files, fileChange, release, episodeNumber, type } = props;
    const { name, playState, overview, title } = mediaInfo;

    return (
        <>
            <MediaInfo
                name={name}
                title={title}
                playState={playState}
                overview={overview}
                selectedFile={selectedFile}
                release={release}
                episodeNumber={episodeNumber}
            />
            <MediaLinks
                type={type}
                tmdbID={mediaInfo.tmdbID}
                imdbID={mediaInfo.imdbID}
                seasonNumber={mediaInfo.seasonNumber}
                episodeNumber={episodeNumber}
            />
            <MediaFiles files={files} selectedFile={selectedFile} fileChange={fileChange} />
            <MediaSubtitles selectedFile={selectedFile} />
            <MediaAudio selectedFile={selectedFile} />
        </>
    );
};

MediaOverview.propTypes = {
    mediaInfo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        tmdbID: PropTypes.number.isRequired,            
        imdbID: PropTypes.string,
        overview: PropTypes.string.isRequired,
        playState: PropTypes.shape({
            finished: PropTypes.bool,
            playtime: PropTypes.number,
        }).isRequired,
        title: PropTypes.string,
        seasonNumber: PropTypes.number
    }).isRequired,
    episodeNumber: PropTypes.number,
    release: PropTypes.string.isRequired,
    files: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    selectedFile: PropTypes.shape({}).isRequired,
    fileChange: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
};

MediaOverview.defaultProps = {
    episodeNumber: null,
}

export default MediaOverview;
