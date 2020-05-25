import ACTIVE_MODALS from '../constants/activeModals';

const openModal = (type) => ({
    type: ACTIVE_MODALS.ADD,
    payload: { type },
});

const closeModal = (type) => ({
    type: ACTIVE_MODALS.REMOVE,
    payload: { type },
});

export { openModal, closeModal };
