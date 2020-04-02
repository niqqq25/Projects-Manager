import { CURRENT_USER } from '../constants';

function currentUser(state = null, { type, payload }) {
    switch (type) {
        case CURRENT_USER.GET_SUCCESS:
            return payload;
        default:
            return state;
    }
}

export default currentUser;

//test some things
//make Error handling reducer
//reewrite all existing reducers with error handling
//change from useSelector to connect
//test all out
