import ALERT_MESSAGE from '../../../constants/alerts';
import ROUTES from '../../../constants/routes';
import { CURRENT_USER } from '../constants';

import alertActions from '../../shared/actions/alert';
import requestingActions from '../actions/requesting';
import confirmationActions from '../actions/confirmation';

import currentUserServices from '../services/currentUser';

const get = () => async dispatch => {
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
const update = ({ password, fullName }) => async dispatch => {
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
            alertActions.successWithTimeout(ALERT_MESSAGE.USER.UPDATE_SUCCESS)
        );
        return { type: CURRENT_USER.UPDATE_SUCCESS, payload: user };
    }

    function error() {
        dispatch(requestingActions.end(UPDATE_USER));
    }
};

export const DELETE_USER = 'currentUser/DELETE';
const _delete = () => async dispatch => {
    dispatch(requestingActions.start(DELETE_USER));

    try {
        await currentUserServices._delete();
        window.location = `${ROUTES.LOGIN}?userDelete=true`;
    } catch {
        dispatch(requestingActions.end(DELETE_USER));
        dispatch(confirmationActions.close());
        dispatch(
            alertActions.errorWithTimeout(ALERT_MESSAGE.USER.DELETION_ERROR)
        );
    }
};

export default { get, logout, update, _delete };

// import { LOGIN, REGISTRATION } from '../constants';

// const login = ({ username, password }) => async dispatch => {
//     dispatch(request());

//     try {
//         await userServices.login({ username, password });
//         dispatch(success());
//         window.location = ROUTES.HOME;
//     } catch {
//         dispatch(error());
//         dispatch(alertActions.errorWithTimeout(ALERT_MESSAGE.USER.LOGIN_ERROR));
//     }

//     function request() {
//         return { type: LOGIN.REQUEST };
//     }
//     function success() {
//         return { type: LOGIN.SUCCESS };
//     }
//     function error() {
//         return { type: LOGIN.ERROR };
//     }
// };

// const register = ({
//     username,
//     password,
//     email,
//     fullName,
//     history,
// }) => async dispatch => {
//     dispatch(request());

//     try {
//         await userServices.register({
//             username,
//             password,
//             email,
//             fullName,
//         });
//         dispatch(success());
//         dispatch(
//             alertActions.successWithTimeout(
//                 ALERT_MESSAGE.USER.REGISTRATION_SUCCESS
//             )
//         );
//         history.push(ROUTES.LOGIN);
//     } catch (err) {
//         dispatch(error(err));
//     }

//     function request() {
//         return { type: REGISTRATION.REQUEST };
//     }
//     function success() {
//         return { type: REGISTRATION.SUCCESS };
//     }
//     function error(error) {
//         return { type: REGISTRATION.ERROR, payload: error };
//     }
// };

// const clearRegistrationError = () => ({
//     type: REGISTRATION.CLEAR_ERROR,
// });

// export default { login, register, clearRegistrationError };
