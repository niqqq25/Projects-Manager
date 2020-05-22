import { TASK_CREATE_MODAL } from '../constants';

function taskCreateModal(state = { isOpen: false }, { type, payload }) {
    switch (type) {
        case TASK_CREATE_MODAL.OPEN:
            return { isOpen: true };
        case TASK_CREATE_MODAL.CLOSE:
            return { isOpen: false };
        default:
            return state;
    }
}

export default taskCreateModal;
