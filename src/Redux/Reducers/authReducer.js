import { SET_AUTH_TOKEN } from '../Actions/authActions';

const initialState = {
    token: '',
    data: {}
};

const auth = (state = initialState, { payload, type }) => {
    switch (type) {
        case SET_AUTH_TOKEN:
            return {
                ...state,
                token: payload.token.jwt,
                data: payload.data
            };
        default:
            return state;
    }
};

export default auth;
