import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { faClosedCaptioning } from '@fortawesome/free-solid-svg-icons';
import SelectSubtitles from './Controls/SelectSubtitles';
import { PlayerControls } from './castActions';
import { PlayPause, BackThirty, ForwardThirty, MuteUnmute, SeekBar, VolumeBar } from './Controls';
import {
    CastPlayerWrap,
    CastingInfo,
    CastingControls,
    CastingVolumne,
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
        const { metadata, playstate } = this.props;

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
                    <h4>{metadata.name}</h4>
                    <h5>{metadata.series}</h5>
                    <img src={metadata.image} alt={metadata.name} />
                </CastingInfo>

                <CastingControls>
                    <BackThirty seek={(val) => PlayerControls.seek(val)} playstate={playstate} />

                    <PlayPause
                        playPause={() => PlayerControls.playOrPause()}
                        isPaused={playstate.paused}
                    />

                    <ForwardThirty seek={(val) => PlayerControls.seek(val)} playstate={playstate} />

                    <SeekBar
                        playstate={playstate}
                        seek={(val) => PlayerControls.seek(val)}
                        playPause={() => PlayerControls.playOrPause()}
                        isPaused={playstate.paused}
                    />
                </CastingControls>

                <CastingVolumne>
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
                </CastingVolumne>
            </CastPlayerWrap>
        );
    }
}

CastControls.propTypes = {
    metadata: PropTypes.shape({}).isRequired,
    playstate: PropTypes.shape({}).isRequired,
};
