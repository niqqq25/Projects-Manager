import { CONFIRMATION } from '../constants';

const defaultState = {
    isOpen: false,
    type: null,
};

function confirmation(state = defaultState, { type, payload }) {
    switch (type) {
        case CONFIRMATION.OPEN:
            return {
                isOpen: true,
                type: payload.type,
            };
        case CONFIRMATION.CLOSE:
            return defaultState;
        default:
            return state;
    }
}

export default confirmation;
