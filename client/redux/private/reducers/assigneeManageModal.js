import ASSIGNEE_MANAGE_MODAL from '../constants/assigneeManageModal';

const defaultState = { members: null };

function assigneeManageModal(state = defaultState, { type, payload }) {
    switch (type) {
        case ASSIGNEE_MANAGE_MODAL.GET_MEMBERS_SUCCESS:
            return { ...state, members: payload.members };
        case ASSIGNEE_MANAGE_MODAL.CLEAR:
            return defaultState;
        default:
            return state;
    }
}

export default assigneeManageModal;
