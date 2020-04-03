import { PROJECT_CREATE_MODAL } from '../constants';

function projectCreateModal(state = { isOpen: false }, { type, payload }) {
    switch (type) {
        case PROJECT_CREATE_MODAL.OPEN:
            return { isOpen: true };
        case PROJECT_CREATE_MODAL.CLOSE:
            return { isOpen: false };
        default:
            return state;
    }
}

export default projectCreateModal;
