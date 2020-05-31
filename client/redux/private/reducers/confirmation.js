import CONFIRMATION from '../constants/confirmation';

const defaultState = {
    type: null,
    callback: null,
};

function confirmation(state = defaultState, { type, payload }) {
    switch (type) {
        case CONFIRMATION.OPEN:
            return { type: payload.type, callback: payload.callback };
        case CONFIRMATION.CLOSE:
            return defaultState;
        default:
            return state;
    }
}

export default confirmation;
