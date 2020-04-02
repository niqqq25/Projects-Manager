import { LOGIN } from '../constants';

function login(state = { isFetching: false }, action) {
    switch (action.type) {
        case LOGIN.REQUEST:
            return { isFetching: true };
        case LOGIN.SUCCESS:
            return { isFetching: false };
        case LOGIN.ERROR:
            return { isFetching: false };
        default:
            return state;
    }
}

export default login;
