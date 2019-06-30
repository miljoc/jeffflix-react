/* eslint-disable */
import { store } from 'Redux/store';

import {
    setCastStatus,
    setCastPlayingStatus,
    setSourceData,
    setCastPlaystate,
    clearCastData,
} from 'Redux/Actions/castActions';

let remotePlayer;
let remotePlayerController;

export const castStatusCheck = (isCasting, isPlaying) => {
    const { framework } = cast;
    const context = framework.CastContext.getInstance();
    const castSession = context.getCurrentSession();

    if (context.getCastState() === 'CONNECTED' && !isCasting) {
        store.dispatch(setCastStatus(true));
    }

    if (castSession && castSession.getMediaSession() && !isPlaying) {
        store.dispatch(setCastPlayingStatus(true));
    }

    castEventListeners();
};

export const castEventListeners = () => {
    const eventType = cast.framework.RemotePlayerEventType;

    let totalDuration;

    remotePlayer = new cast.framework.RemotePlayer();
    remotePlayerController = new cast.framework.RemotePlayerController(remotePlayer);

    remotePlayerController.addEventListener(eventType.IS_CONNECTED_CHANGED, function(e) {
        store.dispatch(setCastStatus(e.value));
        store.dispatch(
            setCastPlaystate({
                volume: remotePlayer.volumeLevel,
            }),
        );

        if (!e.value) store.dispatch(clearCastData());
    });

    remotePlayerController.addEventListener(eventType.IS_MEDIA_LOADED_CHANGED, function(e) {
        const context = cast.framework.CastContext.getInstance();
        const castSession = context.getCurrentSession();

        store.dispatch(setCastPlayingStatus(e.value));

        if (castSession && castSession.getMediaSession() && castSession.getMediaSession().media) {
            const media = castSession.getMediaSession();
            const mediaInfo = media.media;

            if (mediaInfo.metadata) {
                store.dispatch(setSourceData(mediaInfo.metadata));
                totalDuration = mediaInfo.metadata.totalDuration;
            }
        }
    });

    remotePlayerController.addEventListener(eventType.IS_PAUSED_CHANGED, function(e) {
        store.dispatch(
            setCastPlaystate({
                paused: e.value,
            }),
        );
    });

    remotePlayerController.addEventListener(eventType.IS_MUTED_CHANGED, function(e) {
        store.dispatch(
            setCastPlaystate({
                muted: e.value,
            }),
        );
    });

    remotePlayerController.addEventListener(eventType.CURRENT_TIME_CHANGED, function(e) {
        store.dispatch(
            setCastPlaystate({
                playtime: e.value,
                total: totalDuration,
            }),
        );
    });

    remotePlayerController.addEventListener(eventType.VOLUME_LEVEL_CHANGED, function(e) {
        store.dispatch(
            setCastPlaystate({
                volume: e.value,
            }),
        );
    });
};

export const PlayerControls = {
    playOrPause() {
        remotePlayerController.playOrPause();
    },
    muteOrUnmute() {
        remotePlayerController.muteOrUnmute();
    },
    stop() {
        remotePlayerController.stop();
    },
    seek(time) {
        store.dispatch(
            setCastPlaystate({
                playtime: time,
            }),
        );

        remotePlayer.currentTime = time;
        remotePlayerController.seek();
    },
    setVolume(volume) {
        store.dispatch(
            setCastPlaystate({
                volume: volume,
            }),
        );

        remotePlayer.volumeLevel = volume;
        remotePlayerController.setVolumeLevel();
    },
};
