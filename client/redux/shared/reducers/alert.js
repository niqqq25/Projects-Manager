import { ALERT } from '../constants';

function alert(state = {}, action) {
    switch (action.type) {
        case ALERT.SUCCESS:
            return { type: 'success', message: action.payload };
        case ALERT.ERROR:
            return { type: 'error', message: action.payload };
        case ALERT.CLEAR:
            return {};
        default:
            return state;
    }
}

export default alert;
