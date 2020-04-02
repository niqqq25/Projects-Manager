import { REQUESTING } from '../constants';

function requesting(state = [], { type, payload }) {
    switch (type) {
        case REQUESTING.START:
            return [...state, payload];
        case REQUESTING.END:
            return state.filter(request => request !== payload);
        default:
            return state;
    }
}

export default requesting;
