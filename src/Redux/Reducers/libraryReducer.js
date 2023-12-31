import {
    ADD_LIBRARY,
    ADD_LIBRARY_SUCCESS,
    ADD_LIBRARY_FAILURE,
    CLEAR_LIBRARY_ERROR,
} from '../Actions/libraryActions';

const initialState = {
    loading: false,
    error: false,
    errorMessage: '',
};

const library = (state = initialState, { payload, type }) => {
    switch (type) {
        case CLEAR_LIBRARY_ERROR:
            return initialState;
        case ADD_LIBRARY:
            return {
                ...state,
                loading: true,
            };
        case ADD_LIBRARY_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case ADD_LIBRARY_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: payload.err,
            };
        default:
            return state;
    }
};

export default library;
