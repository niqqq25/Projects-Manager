import { v4 as uuidv4 } from 'uuid';
import NOTIFICATIONS from '../constants/NOTIFICATIONS';

function notifications(state = [], { type, payload }) {
    switch (type) {
        case NOTIFICATIONS.ADD_SUCCESS:
            return [
                ...state,
                { id: uuidv4(), message: payload.message, type: 'success' },
            ];
        case NOTIFICATIONS.ADD_ERROR:
            return [
                ...state,
                { id: uuidv4(), message: payload.message, type: 'error' },
            ];
        case NOTIFICATIONS.PREP_REMOVE:
            return state.map((notification) =>
                notification.id === payload.id
                    ? { ...notification, isRemoving: true }
                    : notification
            );
        case NOTIFICATIONS.REMOVE:
            return state.filter(
                (notification) => notification.id !== payload.id
            );
        default:
            return state;
    }
}

export default notifications;
