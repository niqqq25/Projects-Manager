import { ALERT } from '../constants';

const clear = () => ({
    type: ALERT.CLEAR,
});

const success = message => ({
    type: ALERT.SUCCESS,
    payload: message,
});

const error = message => ({
    type: ALERT.ERROR,
    payload: message,
});

const TIME = 2000;
const successWithTimeout = message => dispatch => {
    dispatch(success(message));
    setTimeout(() => dispatch(clear()), TIME);
};

const errorWithTimeout = message => dispatch => {
    dispatch(error(message));
    setTimeout(() => dispatch(clear()), TIME);
};

export default { success, error, clear, successWithTimeout, errorWithTimeout };
