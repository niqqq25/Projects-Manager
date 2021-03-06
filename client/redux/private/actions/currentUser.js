//constants
import NOTIFICATIONS from '../../../constants/notifications';
import ROUTES from '../../../constants/routes';
import CURRENT_USER from '../constants/currentUser';

//actions
import {
    addSuccessNotification,
    addErrorNotification,
} from '../../shared/actions/notifications';
import { startRequest, endRequest } from '../../shared/actions/requests';

//services
import {
    getCurrentUser,
    logoutCurrentUser,
    updateCurrentUser,
    deleteCurrentUser,
} from '../services/users';

const getCurrentUserSuccess = (user) => ({
    type: CURRENT_USER.GET_SUCCESS,
    payload: { user },
});

const _getCurrentUser = () => async (dispatch) => {
    dispatch(startRequest(CURRENT_USER.GET));

    try {
        const { user } = await getCurrentUser();
        dispatch(getCurrentUserSuccess(user));
    } catch (err) {
        console.error(err);
    }

    dispatch(endRequest(CURRENT_USER.GET));
};

const logoutCurrentUserSuccess = () => ({
    type: CURRENT_USER.LOGOUT_SUCCESS,
});

const _logoutCurrentUser = () => async (dispatch) => {
    dispatch(startRequest(CURRENT_USER.LOGOUT));

    try {
        await logoutCurrentUser();
        dispatch(logoutCurrentUserSuccess());
        window.location = ROUTES.LOGIN;
    } catch (err) {
        console.error(err);
    }

    dispatch(endRequest(CURRENT_USER.LOGOUT));
};

const updateCurrentUserSuccess = (user) => ({
    type: CURRENT_USER.UPDATE_SUCCESS,
    payload: { user },
});

const _updateCurrentUser = ({ password, fullName }) => async (dispatch) => {
    dispatch(startRequest(CURRENT_USER.UPDATE));

    try {
        const { user } = await updateCurrentUser({ password, fullName });
        dispatch(addSuccessNotification(NOTIFICATIONS.USER.UPDATE_SUCCESS));
        dispatch(updateCurrentUserSuccess(user));
    } catch (err) {
        console.error(err);
    }

    dispatch(endRequest(CURRENT_USER.UPDATE));
};

const deleteCurrentUserSuccess = () => ({
    type: CURRENT_USER.DELETE_SUCCESS,
});

const _deleteCurrentUser = () => async (dispatch) => {
    dispatch(startRequest(CURRENT_USER.DELETE));

    let error = null;
    try {
        await deleteCurrentUser();
        dispatch(deleteCurrentUserSuccess());
    } catch (err) {
        error = err;
        dispatch(addErrorNotification(NOTIFICATIONS.USER.DELETE_ERROR));
    }

    dispatch(endRequest(CURRENT_USER.DELETE));
    return error;
};

export {
    _getCurrentUser as getCurrentUser,
    _logoutCurrentUser as logoutCurrentUser,
    _updateCurrentUser as updateCurrentUser,
    _deleteCurrentUser as deleteCurrentUser,
};
