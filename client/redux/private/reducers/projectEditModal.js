import { PROJECT_EDIT_MODAL } from '../constants';

function projectEditModal(state = { isOpen: false }, { type, payload }) {
    switch (type) {
        case PROJECT_EDIT_MODAL.OPEN:
            return { isOpen: true };
        case PROJECT_EDIT_MODAL.CLOSE:
            return { isOpen: false };
        default:
            return state;
    }
}

export default projectEditModal;