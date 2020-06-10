import USERS from '../constants/users';

function users(state = [], { type, payload }) {
    switch (type) {
        case USERS.GET_SUCCESS:
            return payload.users;
        case USERS.CLEAR:
            return [];
        default:
            return state;
    }
}

export default users;
