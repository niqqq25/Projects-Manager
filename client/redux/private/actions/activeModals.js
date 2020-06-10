import ACTIVE_MODALS from '../constants/activeModals';

const openModal = (data) => {
    let payload;
    if (typeof data === 'object') {
        payload = { type: data.type, payload: data.payload };
    } else {
        payload = { type: data, payload: null };
    }

    return {
        type: ACTIVE_MODALS.ADD,
        payload,
    };
};

const closeModal = (type) => ({
    type: ACTIVE_MODALS.REMOVE,
    payload: { type },
});

export { openModal, closeModal };
