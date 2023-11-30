import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { withApollo , graphql } from '@apollo/client/react/hoc';
import videojs from 'video.js';
import '@videojs/http-streaming';
import 'videojs-seek-buttons';
import 'videojs-overlay';
import 'videojs-playlist';
import 'videojs-playlist-ui';
import './DebugOverlay';
import './PlaylistButton';

// NOTE(Leon Handreke): Ideally this should be imported from videojs-http-source-selector because
// the fact that it relies on this plugin is an implementation detail. However, the compilation
// setup for that plugin is a bit wonky, so it's easier to just do the plugin registration here.
import 'videojs-contrib-quality-levels';
import 'videojs-http-source-selector';

import UPDATE_PLAYSTATE from 'Mutations/updatePlaystate';
import { showVideo } from 'Redux/Actions/videoActions';
import { updatePlayStateEpisode, updatePlayStateMovie } from 'Components/Media/Actions/updatePlayState';
import FETCH_EPISODE from 'Queries/fetchEpisode';
import { ProgressBar } from 'Styles/Base';

class Player extends Component {
    t = throttle(() => this.playStateMutation( Math.floor( this.player.currentTime() ) ), 2000);

    constructor() {
        super();
        this.state = {
            seconds: 10,
            upNextHTML: null
        };
    }

    componentDidMount() {
        const {
            resume,
            playState,
            source,
            mimeType,
            transmuxed,
            dispatch,
            name,
            title,
            release,
            episodeNumber,
            season,
            type,
            client
        } = this.props;

        const titleOverlayTitle = `<h4>${title || name}</h4>`;
        const titleOverlayContent = type === "Episode"
            ? `${titleOverlayTitle}<span>${season.series.name} - ${season.name}, Episode ${episodeNumber}</span>`
            : `${titleOverlayTitle}<span>${release}</span>`;

        const videoSource = {
            src: source,
            type: mimeType,
        };

        // percentage watched to be considered "finished watching"
        const finishedPercentage = 97;
        this.finishedPercentage = finishedPercentage;

        const startPercentage = 5;
        this.startPercentage = startPercentage;

        dispatch(showVideo());

        // Put videojs in scope for debugging
        this.videojs = videojs;

        videojs.log.level('debug');
        // NOTE(Leon Handreke): This is an ugly hack because otherwise our SourceBuffer becomes full
        // with very large videos and starts throwing errors. Ideally, video.js would properly
        // handle this case and reduce its buffer by itself. See
        // https://github.com/videojs/http-streaming/issues/192
        videojs.Hls.GOAL_BUFFER_LENGTH = 30;
        videojs.Hls.MAX_GOAL_BUFFER_LENGTH = 30;

        // Subtitle extraction might take a _long_ time, 
        // for now let's just take our time with the requests.
        videojs.Hls.xhr.beforeRequest = (options) => ({
            ...options,
            timeout: 90000 
        });

        const videoJsOptions = {
            sources: [videoSource],
            autoplay: true,
            techOrder: ['html5'],
            plugins: {
                httpSourceSelector: {
                    showAutoItem: true,
                },
            },
            controls: true,
            controlBar: {
                volumePanel: {
                    inline: false
                }
            },
            userActions: {
                hotkeys: true
            },
            html5: {
                hls: {
                    enableLowInitialPlaylist: true,
                    smoothQualityChange: true,
                },
                nativeAudioTracks: false,
            },
            playbackRates: [0.75, 1, 1.25, 1.5, 2, 3],
            persistTextTrackSettings: true
        };
        if (transmuxed) {
            // If transmuxed, all non-transmuxed representations are manually disabled in the
            // loadedmetadata handler to disable adaptive bitrate switching.
            videoJsOptions.plugins.httpSourceSelector.showAutoItem = false;
            videoJsOptions.html5.hls.enableLowInitialPlaylist = false;
            // Choose the transmuxed (= highest-bandwidth) version initially.
            videoJsOptions.html5.hls.bandwidth = 1e12;
        }
        this.player = videojs(this.videoNode, videoJsOptions, function onPlayerReady() {
            this.focus();
            this.debugOverlay();
            if(type === "Episode"){
                this.playlistContainer();
            }
            this.qualityLevels();
            this.httpSourceSelector();
        });
        
        const overlays = {
            overlays: [
                {
                    class: 'vjs-title-overlay',
                    start: 'useractive',
                    end: 'userinactive',
                    content: titleOverlayContent
                },
                {
                    start: 5,
                    content: '',
                    class: 'vjs-debug-overlay'
                }
            ]
        };

        this.player.overlay(overlays);        

        this.player.playlistUi({
            nextOverlay: true,
            showDescription: true
        });

        if(type === "Episode") {
            const finalPlaylist = this.finalPlaylist();
            this.finalPlaylist = finalPlaylist;
            
            if(finalPlaylist.length > 1){
                this.setState({
                    upNextHTML: finalPlaylist[1].html
                });
            }
            
            this.player.playlist(finalPlaylist);
            this.player.playlist.autoadvance(10);

            // update title overlay
            // https://github.com/brightcove/videojs-playlist/blob/main/docs/api.md#playlistitem
            this.player.on('playlistitem', () => {
                const currentItem = this.player.playlist.currentItem();
                const nextItem = this.player.playlist.nextIndex();
                // in case the order changes dynamically, get the index for the title overlay based on class
                const titleOverlayIndex = overlays.overlays.findIndex(o => o.class === "vjs-title-overlay");

                // makes sure current episode and next episode are in the cache
                client.query({
                    query: FETCH_EPISODE,
                    variables: {
                        uuid: finalPlaylist[currentItem].uuid
                    }
                });

                client.query({
                    query: FETCH_EPISODE,
                    variables: {
                        uuid: finalPlaylist[nextItem].uuid
                    }
                });
               
                // change title overlay content, pulled from playlist object
                overlays.overlays[titleOverlayIndex].content = finalPlaylist[currentItem].html;
                this.player.overlay(overlays);

                this.player.removeClass("vjs-video-ended");
                this.player.removeClass("vjs-video-finishing");
                this.player.removeClass("vjs-last-playlist-item");

                if(currentItem !== nextItem){
                    setTimeout(() => {               
                        this.setState({
                            upNextHTML: finalPlaylist[nextItem].html
                        });
                    }, 1000);
                }else{
                    this.player.addClass("vjs-last-playlist-item");
                }

            });
        }

        this.player.seekButtons({
            forward: 30,
            back: 10
        });

        this.player.on('timeupdate', () => {
            const currentTime = this.player.currentTime();
            const currentDuration = this.player.duration();
            const finishing = currentTime * (100 / currentDuration) > finishedPercentage;

            // calculate when to start reporting playstate
            const startedDuration = ~~(currentDuration * (startPercentage / 100));
            const startPlaystate = startedDuration >= 30 ? startedDuration : 30;

            if(currentTime > startPlaystate) this.t();
            
            // when finishing, show "up next"
            if(finishing){
                this.player.addClass("vjs-video-finishing");
            }else{
                this.player.removeClass("vjs-video-finishing");
            }
            
            // when ended, show "autoplaying next episode"
            if( currentTime !== currentDuration ){
                this.player.removeClass("vjs-video-ended");
            }
        });

        this.player.on('ended', () => {
            this.player.removeClass('vjs-video-finishing');
            this.player.addClass("vjs-video-ended");

            // if we're not on the last item!
            if(this.player.playlist.currentItem() !== this.player.playlist.nextIndex()){
                this.countDown();
                this.timer = setInterval(this.countDown, 1000);
            }
        });        

        this.player.on('loadedmetadata', this.enableQualityLevels);

        if (resume) {
            this.player.currentTime(playState.playtime);
        } else {
            this.player.currentTime(0);
        }

        window.player = this.player;
    }

    componentWillUnmount() {
        this.t.cancel();
        clearInterval(this.timer);

        if (this.player) {
            this.player.dispose();
        }
    }

    finalPlaylist = () => {
        const { name, season, episodeNumber, source, mimeType, playlist, uuid } = this.props;
        const html = 
        `<h4>${name}</h4><span>${season.series.name} - ${season.name}, Aflevering ${episodeNumber}</span>`;
        const firstPlaylistItem = {
            name,
            description: `${season.series.name} - ${season.name}, Aflevering ${episodeNumber}`,
            uuid,
            html,
            season: season.name,
            series: season.series.name,
            episodeNumber,
            sources: [{
                src: source,
                type: mimeType,                
            }]
        };

        const finalPlaylist = [firstPlaylistItem, ...playlist];

        return finalPlaylist;
    }

    playStateMutation = (playtime) => {
        const { uuid, length, mutate, type } = this.props;
        const finished = playtime * (100 / length) > this.finishedPercentage;

        if (type === 'Episode') {
            const currentItem = this.player.playlist.currentItem();
            const currentUUID = this.finalPlaylist[currentItem].uuid;
            updatePlayStateEpisode(mutate, currentUUID, playtime, finished);
        } else {
            updatePlayStateMovie(mutate, uuid, playtime, finished);
        }
    };

    enableQualityLevels = () => {
        const { transmuxed } = this.props;
        if (transmuxed) {
            for (let i = 1; i < this.player.qualityLevels().length; i += 1) {
                this.player.qualityLevels()[i].enabled = false;
            }
            // On iOS, qualityLevels is empty.
            if (this.player.qualityLevels().length > 0) {
                // TODO(Leon Handreke): This relies on transmuxed always being first in the playlist. See
                // comment below for more background on this hack.
                this.player.qualityLevels()[0].enabled = true;
            }
        }
    };

    countDown = () => {
        const { seconds } = this.state;

        if (seconds > 0) {
            this.setState(() => ({
                seconds: seconds - 1
            }));    
        }
        
        if (seconds === 0) {
            clearInterval(this.timer);
            setTimeout(() => {                
                this.setState({
                    seconds: 10
                });
            }, 1000);
        }
    };

    cancelAutoplay = () => {
        clearInterval(this.timer);
        this.player.playlist.autoadvance();
        this.player.removeClass("vjs-video-ended");
        this.player.addClass("vjs-video-finishing");        
    };
    
    render() {
        const { upNextHTML, seconds } = this.state;
        const { type } = this.props;

        return (
            <>
                <div data-vjs-player>
                    {/* eslint-disable-next-line */}
                    <video
                        ref={(node) => {
                            this.videoNode = node;
                        }}
                        className="video-js vjs-theme-olaris"
                    />
                    <div className="vjs-playlist" />
                    {type === "Episode" && (
                        <>
                            <button
                                type="button"
                                className="vjs-upnext-overlay"
                                onClick={() => {
                                    this.player.playlist.next()
                                }}
                            >
                                <span>up next</span>
                                {/* eslint-disable-next-line react/no-danger */}
                                <div dangerouslySetInnerHTML={{__html: upNextHTML }} />
                            </button>
                            <div className="vjs-autoplay-overlay">
                                <div className="vjs-autoplay--text-wrap">
                                    {seconds > 0
                                        ? <span>playing in <strong>{seconds}</strong> seconds</span>
                                        : <span>playing now...</span>
                                    }
                                    <div
                                        className="vjs-autoplay--up-next-info"
                                        /* eslint-disable-next-line react/no-danger */
                                        dangerouslySetInnerHTML={{__html: upNextHTML }}
                                    />
                                </div>
                                <div className="vjs-autoplay--button-wrap">
                                    <button
                                        type="button"
                                        className="vjs-autoplay--cancel-autoplay"
                                        onClick={this.cancelAutoplay}
                                    >
                                    Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="vjs-autoplay--play-immediately"
                                        onClick={() => {
                                            this.player.playlist.next()
                                        }}
                                    >
                                        <div className="vjs-autoplay--count-down">
                                            <ProgressBar
                                                width={seconds * 10}
                                            />
                                        </div>
                                        <span className="vjs-autoplay--play-icon" />
                                        Next Episode
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </>
        );
    }
}

Player.propTypes = {
    // Video source, opaque as it gets passed directly to video.js
    // TODO(Leon Handreke): It should not be opaque to us, our caller should
    // not need to know about video.js
    // eslint-disable-next-line
    source: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    uuid: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired,
    mutate: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    mimeType: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    release: PropTypes.string.isRequired,
    episodeNumber: PropTypes.number,
    season: PropTypes.shape({
        name: PropTypes.string,
        episodes: PropTypes.arrayOf(
            PropTypes.shape({
                episodeNumber: PropTypes.number,
                uuid: PropTypes.string,
            }),
        ),
        series: PropTypes.shape({
            name: PropTypes.string,
            posterPath: PropTypes.string,
        }),
    }),    
    playState: PropTypes.shape({
        finished: PropTypes.bool,
        playtime: PropTypes.number,
    }).isRequired,
    resume: PropTypes.bool,
    // TODO(Leon Handreke): This is an ugly hack. We'd like to change our
    // quality switching behavior based on whether the stream is transmuxed or not.
    // However, we don't have a way to detect this from this.player.representations()
    // because videojs/http-streaming doesn't pass through any metadata.
    // To avoid forking for now, do this.
    transmuxed: PropTypes.bool.isRequired,
    playlist: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.shape({})
        ),
        PropTypes.bool
    ]).isRequired,
    client: PropTypes.shape({
        query: PropTypes.func.isRequired,
    }).isRequired
};

Player.defaultProps = {
    resume: false,
    episodeNumber: null,
    title: null,
    season: {}
};

export default withApollo(
    graphql(UPDATE_PLAYSTATE)(Player)
);
