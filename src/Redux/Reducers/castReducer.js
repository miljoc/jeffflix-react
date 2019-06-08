import {
    SET_AUTH_DATA,
    SET_VIDEO_DATA,
    CAST_CONNECTED,
    CAST_PLAYING,
} from '../Actions/castActions';

const initialState = {
    connected: false,
    playing: false,
    auth: {},
    metadata: {},
};

const cast = (state = initialState, { payload, type }) => {
    switch (type) {
        case SET_AUTH_DATA:
            return {
                ...state,
                auth: {
                    data: payload.data,
                    token: payload.token,
                    baseUrl: payload.baseUrl,
                },
            };
        case CAST_CONNECTED:
            return {
                ...state,
                connected: payload.status,
            };
        case CAST_PLAYING:
            return {
                ...state,
                playing: payload.status,
            };
        case SET_VIDEO_DATA:
            return {
                ...state,
                metadata: {
                    ...payload.metadata,
                },
            };
        default:
            return state;
    }
};

export default cast;
