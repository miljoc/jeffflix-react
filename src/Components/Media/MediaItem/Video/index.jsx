/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { canPlayCodec, getBaseUrl } from 'Helpers';
import { castStatusCheck } from 'Components/CastPlayer/castActions';
import { setCastPlayingStatus } from 'Redux/Actions/castActions';

import Player from './Player';

import { VideoWrap, CloseVideo } from '../Styles';

class VideoController extends Component {
    constructor() {
        super();

        this.state = {
            message: {},
            request: null,
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.escapeClose, false);
        this.setCastData();
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.escapeClose, false);
    }

    escapeClose = (e) => e.key === 'Escape' && this.props.closePlayer();

    setCastData = () => {
        const { uuid, auth } = this.props;

        const message = { ...auth, uuid };

        this.setState({
            message,
        });
    };

    castSession = (castSession, source, mimeType) => {
        const { message } = this.state;
        const { playState, name, posterPath, overview, selectedFile, uuid, resume } = this.props;
        const namespace = 'urn:x-cast:com.auth';

        const mediaInfo = new chrome.cast.media.MediaInfo(source, mimeType);
        mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
        mediaInfo.metadata.name = name;
        mediaInfo.metadata.overview = overview;
        mediaInfo.metadata.uuid = uuid;
        mediaInfo.metadata.image = `${getBaseUrl()}/olaris/m/images/tmdb/w342/${posterPath}`;
        mediaInfo.metadata.totalDuration = selectedFile.totalDuration;

        const request = new chrome.cast.media.LoadRequest(mediaInfo);
        if (resume) request.currentTime = playState.playtime;

        const onLoadSuccess = () => {
            castStatusCheck();
            setCastPlayingStatus(true);
        };
        const onLoadError = (e) => console.log(e);

        castSession.sendMessage(namespace, message);
        castSession.loadMedia(request).then(onLoadSuccess, onLoadError);
    };

    render() {
        const {
            source,
            files,
            selectedFile,
            resume,
            playState,
            uuid,
            type,
            closePlayer,
            dispatch,
            mimeType,
            isCasting,
        } = this.props;

        const castSession = cast.framework.CastContext.getInstance().getCurrentSession();
        const videoCodec = files[selectedFile.value].streams
            .filter((s) => s.streamType === 'video')
            .map((s) => s.codecMime)[0];
        const transmuxed = canPlayCodec(videoCodec);

        if (source.length > 0 && !isCasting) {
            return (
                <Fragment>
                    <VideoWrap>
                        <CloseVideo icon={faTimes} onClick={closePlayer} />
                        <Player
                            source={source}
                            mimeType={mimeType}
                            transmuxed={transmuxed}
                            resume={resume}
                            playState={playState}
                            uuid={uuid}
                            length={selectedFile.totalDuration}
                            type={type}
                            dispatch={dispatch}
                        />
                    </VideoWrap>
                </Fragment>
            );
        } else if (isCasting && source.length > 0) {
            this.castSession(castSession, source, mimeType);

            return null;
        } else {
            return null;
        }
    }
}

VideoController.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isCasting: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    const { cast } = state;

    return {
        auth: cast.auth,
        isCasting: cast.connected,
    };
};

const mapDispatchToProps = (dispatch) => ({
    setCastPlayingStatus: (status) => dispatch(setCastPlayingStatus(status)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(VideoController);
