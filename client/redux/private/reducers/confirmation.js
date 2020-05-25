import CONFIRMATION from '../constants/confirmation';

function confirmation(state = null, { type, payload }) {
    switch (type) {
        case CONFIRMATION.OPEN:
            return payload.type;
        case CONFIRMATION.CLOSE:
            return null;
        default:
            return state;
    }
}

export default confirmation;
