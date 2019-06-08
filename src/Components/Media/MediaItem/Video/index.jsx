/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { setSourceData } from 'Redux/Actions/castActions';
import { canPlayCodec } from 'Helpers';

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
        const { source, name, playState, uuid, dispatch, auth } = this.props;

        const sourceData = {
            source,
            name,
            playState,
        };

        dispatch(setSourceData(sourceData));

        const message = { ...auth, uuid };

        this.setState({
            message,
        });
    };

    castSession = (castSession, source, mimeType) => {
        const { message } = this.state;
        const { playState } = this.props;
        const namespace = 'urn:x-cast:com.auth';

        const mediaInfo = new chrome.cast.media.MediaInfo(source, mimeType);
        const request = new chrome.cast.media.LoadRequest(mediaInfo);
        request.currentTime = playState.playtime;
        const onLoadSuccess = () => console.log('Casting');
        const onLoadError = () => console.log('Failure');

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
};

const mapStateToProps = (state) => {
    const { cast } = state;

    return {
        auth: cast.auth,
        isCasting: cast.connected,
    };
};

export default connect(mapStateToProps)(VideoController);
