import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { compose, isEmpty } from 'lodash/fp';
import { useMutation } from '@apollo/client';
import { connect } from 'react-redux';
import { isIOS } from 'react-device-detect';
import { useLocation } from 'react-router';

import REQUEST_STREAM from 'Mutations/requestStream';
import { generateFileList, getBaseUrl } from 'Helpers';
import { hideVideo } from 'Redux/Actions/videoActions';

import Breadcrumbs from 'Components/Breadcrumbs';
import MediaCard from 'Components/Media/Card';
import useCreatePlaylist from 'Helpers/useCreatePlaylist';
import getVideoSource from './Video/getVideoSource';
import MediaItemHeader from '../MediaHeader/MediaItemHeader';
import MediaOverview from './MediaOverview';
import MediaNavigation from './MediaOverview/MediaNavigation';
import VideoController from './Video';

import { MediaFull } from './Styles';
import { MediaFullWrap, MediaLeftCol, MediaRightCol } from '../Styles';

const MediaItem = ({
    imdbID,
    tmdbID,
    posterPath,
    episodeNumber,
    seasonNumber,
    season,
    type,
    wide,
    uuid,
    name,
    title,
    overview,
    isConnected,
    isPlaying,
    playState,
    airDate,
    year,
    files,
    dispatch
}) => {
    const location = useLocation();
    const [playlistLoading, playlist] = useCreatePlaylist(uuid, type);
    const generatedFileList = generateFileList(files);
    const [source, setSource] = useState('');
    const [resume, setResume] = useState(location.state !== undefined ? location.state.resume : false);
    const [fileList] = useState(generatedFileList);
    const [selectedFile, setSelectedFile] = useState(fileList[0]);
    const [mimeType, setMimeType] = useState('');
    const [castsource, setCastsource] = useState('');
    const [mounted, setMounted] = useState(true);
    const [streams, setStreams] = useState(null);  

    const playMediaCallback = (streamData) => {
        setStreams(streamData.createStreamingTicket.streams);

        fetch(getBaseUrl() + streamData.createStreamingTicket.metadataPath)
            .then((response) => response.json())
            .then((response) => getVideoSource(isIOS, streamData, response))
            .then((response) => {
                setMimeType(response.mimeType);

                if (isConnected) {
                    setCastsource(response.source);
                } else {
                    setSource(response.source);
                }
            })
            .catch((err) => err);   
    }

    const [requestStream] = useMutation(REQUEST_STREAM, {
        onCompleted(data){
            playMediaCallback(data);
        }
    });

    const playMedia = (shouldResume) => {
        setResume(shouldResume);

        requestStream({
            variables: { uuid: files[selectedFile.value].uuid }
        });
    };

    useLayoutEffect(() => {
        const autoplay = !!(location.state && location.state.autoplay);
        if (autoplay) playMedia(resume);

        return () => {
            setMounted(false);
        }
    }, []);
    

    const fileChange = (file) => setSelectedFile(file);

    const closePlayer = () => {
        if (isPlaying && mounted) {
            setSource('');
            dispatch(hideVideo());
        }
    };

    const background = isEmpty(season) ? posterPath : season.series.posterPath;
    const renderedName = type === 'Movie' ? title : name;
    const mediaInfo = {
        imdbID,
        tmdbID,
        posterPath,
        episodeNumber,
        seasonNumber,
        season,
        type,
        wide,
        uuid,
        name,
        title,
        overview,
        isConnected,
        isPlaying,
        playState,
        airDate,
        year,
        files,
        dispatch
    };

    return (
        <MediaFullWrap>
            <Breadcrumbs type={type} name={renderedName} season={season} />
            {((type === 'Episode' || type === 'Season') && season.episodes.length > 1) &&
                <MediaNavigation episodeNumber={episodeNumber} season={season} />
            }
            <MediaFull>
                <MediaLeftCol>
                    <MediaCard
                        wide={wide}
                        playMedia={playMedia}
                        internalCard
                        text
                        files={files}
                        name={name}
                        title={title}
                        playState={playState}
                        posterPath={posterPath}
                        type={type}
                        uuid={uuid}
                        showText={false}
                    />
                </MediaLeftCol>
                <MediaRightCol>
                    <MediaItemHeader
                        type={type}
                        file={selectedFile}
                        files={files}
                        uuid={uuid}
                        name={name}
                        playMedia={playMedia}
                        playState={playState}
                        isConnected={isConnected}
                    />
                    <MediaOverview
                        mediaInfo={mediaInfo}
                        selectedFile={selectedFile}
                        files={fileList}
                        fileChange={fileChange}
                        isConnected={isConnected}
                        release={year || airDate}
                        episodeNumber={episodeNumber}
                        type={type}
                    />
                </MediaRightCol>
            </MediaFull>
            {(!playlistLoading || type === "Movie") && (
                <VideoController
                    source={source}
                    files={files}
                    selectedFile={selectedFile}
                    resume={resume}
                    name={name}
                    title={title}
                    overview={overview}
                    release={year || airDate}
                    episodeNumber={episodeNumber}
                    playState={playState}
                    type={type}
                    mimeType={mimeType}
                    uuid={uuid}
                    background={background}
                    castsource={castsource}
                    dispatch={dispatch}
                    season={season && season}
                    streams={streams}
                    closePlayer={() => closePlayer()}
                    playlist={playlist}
                />
            )}
        </MediaFullWrap>
    );
}

const requiredPropsCheck = (props, propName, componentName) => {
    const { year, airDate } = props;
    if (!year && !airDate) {
        return new Error(`One of 'year' or 'airDate' is required by '${componentName}' component.`);
    }

    return null;
};

MediaItem.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    overview: PropTypes.string.isRequired,
    isConnected: PropTypes.bool.isRequired,
    imdbID: PropTypes.string,
    tmdbID: PropTypes.number.isRequired,
    posterPath: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    wide: PropTypes.bool,
    episodeNumber: PropTypes.number,
    seasonNumber: PropTypes.number,
    year: requiredPropsCheck,
    airDate: requiredPropsCheck,
    files: PropTypes.arrayOf(
        PropTypes.shape({
            fileName: PropTypes.string,
            filePath: PropTypes.string,
        }),
    ).isRequired,
    season: PropTypes.shape({
        episodes: PropTypes.arrayOf(
            PropTypes.shape({
                episodeNumber: PropTypes.number,
                uuid: PropTypes.string,
            }),
        ),
        series: PropTypes.shape({
            posterPath: PropTypes.string,
        }),
    }),
    location: PropTypes.shape({
        state: PropTypes.shape({
            autoplay: PropTypes.bool,
            resume: PropTypes.bool,
        }),
    }),
    uuid: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool,
    playState: PropTypes.shape({}).isRequired,
    type: PropTypes.string.isRequired
};

MediaItem.defaultProps = {
    posterPath: null,
    isPlaying: null,
    wide: null,
    year: null,
    airDate: null,
    season: {},
    location: {},
    episodeNumber: null,
    seasonNumber: null,
    title: null,
    imdbID: null
};

const mapStateToProps = (state) => {
    const { video, cast } = state;

    return {
        isPlaying: video.playing,
        isConnected: cast.connected,
    };
};

export default compose(connect(mapStateToProps))(MediaItem);
