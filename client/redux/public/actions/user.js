import USER from '../constants/user';
import NOTIFICATIONS from '../../../constants/notifications';
import ROUTES from '../../../constants/routes';

import {
    addSuccessNotification,
    addErrorNotification,
} from '../../shared/actions/notifications';
import { startRequest, endRequest } from '../../shared/actions/requests';
import { registerUser, loginUser } from '../services/user';

const _loginUser = ({ username, password }) => async (dispatch) => {
    dispatch(startRequest(USER.LOGIN));

    try {
        await loginUser({ username, password });
        window.location = ROUTES.HOME;
    } catch {
        dispatch(addErrorNotification(NOTIFICATIONS.USER.LOGIN_ERROR));
    }

    dispatch(endRequest(USER.LOGIN));
};

const _registerUser = ({ username, password, email, fullName }) => async (
    dispatch
) => {
    dispatch(startRequest(USER.REGISTRATION));

    let error = null;
    try {
        await registerUser({
            username,
            password,
            email,
            fullName,
        });
        dispatch(addSuccessNotification(NOTIFICATIONS.USER.REGISTER_SUCCESS));
    } catch (err) {
        error = err.message;
    }

    dispatch(endRequest(USER.REGISTRATION));
    return error;
};

export { _loginUser as loginUser, _registerUser as registerUser };
