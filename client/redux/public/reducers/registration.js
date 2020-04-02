import { REGISTRATION } from '../constants';

const defaultState = {
    isFetching: false,
    error: null,
};

function registration(state = defaultState, action) {
    switch (action.type) {
        case REGISTRATION.REQUEST:
            return { isFetching: true, error: null };
        case REGISTRATION.SUCCESS:
            return { isFetching: false, error: null };
        case REGISTRATION.ERROR:
            return { isFetching: false, error: action.payload };
        case REGISTRATION.CLEAR_ERROR:
            return { ...state, error: null };
        default:
            return state;
    }
}

export default registration;
