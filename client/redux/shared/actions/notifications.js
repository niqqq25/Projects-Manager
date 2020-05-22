import NOTIFICATION from '../constants/notifications';

const addSuccessNotification = (message) => ({
    type: NOTIFICATION.ADD_SUCCESS,
    payload: { message },
});

const addErrorNotification = (message) => ({
    type: NOTIFICATION.ADD_ERROR,
    payload: { message },
});

const prepRemoveNotification = (id) => ({
    type: NOTIFICATION.PREP_REMOVE,
    payload: { id },
});

const removeNotification = (id) => ({
    type: NOTIFICATION.REMOVE,
    payload: { id },
});

export {
    addSuccessNotification,
    addErrorNotification,
    prepRemoveNotification,
    removeNotification,
};
