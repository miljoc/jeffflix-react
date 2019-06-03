export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';

export const setAuthToken = (data, token) => ({
    type: SET_AUTH_TOKEN,
    payload: {
        data,
        token
    }
});
