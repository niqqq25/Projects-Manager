import ACTIVE_MODALS from '../constants/activeModals';

function activeModals(state = [], { type, payload }) {
    switch (type) {
        case ACTIVE_MODALS.ADD:
            return [...state, payload];
        case ACTIVE_MODALS.REMOVE:
            return state.filter(({ type }) => type !== payload.type);
        default:
            return state;
    }
}

export default activeModals;
