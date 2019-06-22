/* eslint-disable */
import { store } from 'Redux/store';

import {
    setCastStatus,
    setCastPlayingStatus,
    setSourceData,
    setCastPlaystate,
    clearCastData,
} from 'Redux/Actions/castActions';

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
    const { framework } = cast;
    const eventType = framework.RemotePlayerEventType;
    const playerController = new framework.RemotePlayerController(new framework.RemotePlayer());
    const context = framework.CastContext.getInstance();
    const castSession = context.getCurrentSession();

    let totalDuration;

    if (castSession && castSession.getMediaSession() && castSession.getMediaSession().media) {
        const media = castSession.getMediaSession();
        const mediaInfo = media.media;

        if (mediaInfo.metadata) {
            store.dispatch(setSourceData(mediaInfo.metadata));
            totalDuration = mediaInfo.metadata.totalDuration;
        }
    }

    playerController.addEventListener(eventType.IS_CONNECTED_CHANGED, function(e) {
        store.dispatch(setCastStatus(e.value));

        if (!e.value) store.dispatch(clearCastData());
    });

    playerController.addEventListener(eventType.IS_MEDIA_LOADED_CHANGED, function(e) {
        store.dispatch(setCastPlayingStatus(e.value));
    });

    playerController.addEventListener(eventType.CURRENT_TIME_CHANGED, function(e) {
        store.dispatch(
            setCastPlaystate({
                playtime: e.value,
                total: totalDuration,
            }),
        );
    });
};
