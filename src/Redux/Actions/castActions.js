export const SET_AUTH_DATA = 'SET_AUTH_TOKEN';
export const SET_VIDEO_DATA = 'SET_VIDEO_DATA';
export const CAST_CONNECTED = 'CAST_CONNECTED';
export const CAST_PLAYING = 'CAST_PLAYING';

export const setCastStatus = (status) => ({
    type: CAST_CONNECTED,
    payload: {
        status,
    },
});

export const setCastPlayingStatus = (status) => ({
    type: CAST_PLAYING,
    payload: {
        status,
    },
});

export const setAuthData = ({ data, token, baseUrl }) => ({
    type: SET_AUTH_DATA,
    payload: {
        data,
        token,
        baseUrl,
    },
});

export const setSourceData = (metadata) => ({
    type: SET_VIDEO_DATA,
    payload: {
        metadata,
    },
});
