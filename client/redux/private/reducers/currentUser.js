import CURRENT_USER from '../constants/currentUser';

function currentUser(state = null, { type, payload }) {
    switch (type) {
        case CURRENT_USER.GET_SUCCESS:
        case CURRENT_USER.UPDATE_SUCCESS:
            return payload.user;
        case CURRENT_USER.LOGOUT_SUCCESS:
        case CURRENT_USER.DELETE_SUCCESS:
            return null;
        default:
            return state;
    }
}

export default currentUser;
