import React from 'react';
import PropTypes from 'prop-types';

import MediaInfo from './MediaInfo';
import MediaFiles from './MediaFiles';
import MediaSubtitles from './MediaSubtitles';
import MediaAudio from './MediaAudio';

const MediaOverview = (props) => {
    const { mediaInfo, selectedFile, files, fileChange, release } = props;
    const { name, playState, overview } = mediaInfo;

    return (
        <>
            <MediaInfo
                name={name}
                playState={playState}
                overview={overview}
                selectedFile={selectedFile}
                release={release}
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
        overview: PropTypes.string.isRequired,
        playState: PropTypes.shape({
            finished: PropTypes.bool,
            playtime: PropTypes.number,
        }).isRequired,
    }).isRequired,
    release: PropTypes.string.isRequired,
    files: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    selectedFile: PropTypes.shape({}).isRequired,
    fileChange: PropTypes.func.isRequired,
};

export default MediaOverview;
