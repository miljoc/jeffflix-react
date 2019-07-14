import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { faClosedCaptioning } from '@fortawesome/free-solid-svg-icons';
import Loading from 'Components/Loading';
import SelectSubtitles from './Controls/SelectSubtitles';
import { PlayerControls } from './castActions';
import { PlayPause, BackThirty, ForwardThirty, MuteUnmute, SeekBar, VolumeBar } from './Controls';
import {
    CastPlayerWrap,
    CastingInfo,
    CastingControls,
    CastingVolume,
    CastPopupOptions,
    SubtitleToggle,
} from './Styles';

export default class CastControls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subtitle: null,
            subtitleOpen: false,
        };
    }

    subtitleChange = (subtitle) => {
        this.setState({
            subtitle,
            subtitleOpen: false,
        });

        PlayerControls.setTrack(subtitle.value);
    };

    toggleSubtitles = () => {
        const { subtitleOpen } = this.state;

        this.setState({
            subtitleOpen: !subtitleOpen,
        });
    };

    render() {
        const { subtitle, subtitleOpen } = this.state;
        const { metadata, playstate, castSending, castPlaying } = this.props;

        if (!castSending && castPlaying)
            return (
                <CastPlayerWrap>
                    <CastPopupOptions>
                        {metadata.tracks && metadata.tracks.length > 0 && (
                            <Fragment>
                                <SelectSubtitles
                                    value={subtitle}
                                    options={metadata.tracks}
                                    onChange={(val) => this.subtitleChange(val)}
                                    menuIsOpen={subtitleOpen}
                                />
                            </Fragment>
                        )}
                    </CastPopupOptions>
                    <CastingInfo>
                        <h4>{metadata.title}</h4>
                        {metadata.subtitle && <h5>{metadata.subtitle}</h5>}
                        {metadata.images && (
                            <img src={metadata.images[0].url} alt={metadata.title} />
                        )}
                    </CastingInfo>

                    <CastingControls>
                        <BackThirty
                            seek={(val) => PlayerControls.seek(val)}
                            playstate={playstate}
                        />

                        <PlayPause
                            playPause={() => PlayerControls.playOrPause()}
                            isPaused={playstate.paused}
                        />

                        <ForwardThirty
                            seek={(val) => PlayerControls.seek(val)}
                            playstate={playstate}
                        />

                        <SeekBar
                            playstate={playstate}
                            seek={(val) => PlayerControls.seek(val)}
                            playPause={() => PlayerControls.playOrPause()}
                            isPaused={playstate.paused}
                        />
                    </CastingControls>

                    <CastingVolume>
                        {metadata.tracks && metadata.tracks.length > 1 && (
                            <SubtitleToggle
                                icon={faClosedCaptioning}
                                onClick={() => this.toggleSubtitles()}
                            />
                        )}
                        <MuteUnmute
                            muteUnmute={() => PlayerControls.muteOrUnmute()}
                            isMuted={playstate.muted}
                        />
                        <VolumeBar
                            playstate={playstate}
                            isMuted={playstate.muted}
                            setVolume={(volume) => PlayerControls.setVolume(volume)}
                        />
                    </CastingVolume>
                </CastPlayerWrap>
            );

        if (castSending)
            return (
                <CastPlayerWrap>
                    <Loading />
                </CastPlayerWrap>
            );

        return null;
    }
}

CastControls.propTypes = {
    metadata: PropTypes.shape({}).isRequired,
    playstate: PropTypes.shape({}).isRequired,
    castSending: PropTypes.bool.isRequired,
    castPlaying: PropTypes.bool.isRequired,
};
