import NOTIFICATIONS from '../../../constants/notifications';
import ROUTES from '../../../constants/routes';
import { CURRENT_USER } from '../constants';

import {
    addSuccessNotification,
    addErrorNotification,
} from '../../shared/actions/notifications';
import requestingActions from '../actions/requesting';
import confirmationActions from '../actions/confirmation';

import currentUserServices from '../services/currentUser';

const get = () => async (dispatch) => {
    try {
        const { user } = await currentUserServices.get();
        dispatch(success(user));
    } catch (err) {
        error(err);
    }

    function success(user) {
        return { type: CURRENT_USER.GET_SUCCESS, payload: user };
    }
    function error(error) {
        console.error(error);
    }
};

const logout = () => async () => {
    await currentUserServices.logout();
    window.location = ROUTES.LOGIN;
};

export const UPDATE_USER = 'currentUser/UPDATE';
const update = ({ password, fullName }) => async (dispatch) => {
    dispatch(requestingActions.start(UPDATE_USER));

    try {
        const { user } = await currentUserServices.update({
            password,
            fullName,
        });
        dispatch(success(user));
    } catch {
        error();
    }

    function success(user) {
        dispatch(requestingActions.end(UPDATE_USER));
        dispatch(
            addSuccessNotification(
                NOTIFICATIONS.USER.UPDATE_SUCCESS
            )
        );
        return { type: CURRENT_USER.UPDATE_SUCCESS, payload: user };
    }

    function error() {
        dispatch(requestingActions.end(UPDATE_USER));
    }
};

export const DELETE_USER = 'currentUser/DELETE';
const _delete = () => async (dispatch) => {
    dispatch(requestingActions.start(DELETE_USER));

    try {
        await currentUserServices._delete();
        window.location = `${ROUTES.LOGIN}?userDelete=true`;
    } catch {
        dispatch(requestingActions.end(DELETE_USER));
        dispatch(confirmationActions.close());
        dispatch(
            addErrorNotification(NOTIFICATIONS.USER.DELETION_ERROR)
        );
    }
};

export default { get, logout, update, _delete };
