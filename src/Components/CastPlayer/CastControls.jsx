import React from 'react';
import { PlayerControls } from './castActions';

import { PlayPause, BackThirty, ForwardThirty, MuteUnmute, SeekBar, VolumnBar } from './Controls';

import { CastPlayerWrap, CastingInfo, CastingControls, CastingVolumne } from './Styles';

const CastControls = ({ metadata, playstate }) => {
    return (
        <CastPlayerWrap>
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
                <MuteUnmute
                    muteUnmute={() => PlayerControls.muteOrUnmute()}
                    isMuted={playstate.muted}
                />
                <VolumnBar
                    playstate={playstate}
                    isMuted={playstate.muted}
                    setVolume={(volume) => PlayerControls.setVolume(volume)}
                />
            </CastingVolumne>
        </CastPlayerWrap>
    );
};

export default CastControls;
