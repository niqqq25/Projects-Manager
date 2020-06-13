import MEMBER_ADD_MODAL from '../constants/memberAddModal';

const defaultState = { users: null };

function memberAddModal(state = defaultState, { type, payload }) {
    switch (type) {
        case MEMBER_ADD_MODAL.GET_USERS_SUCCESS:
            return { ...state, users: payload.users };
        case MEMBER_ADD_MODAL.CLEAR:
            return defaultState;
        default:
            return state;
    }
}

export default memberAddModal;
