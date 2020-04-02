import { LOGIN, REGISTRATION } from '../constants';
import ALERT_MESSAGE from '../../../constants/alerts';
import ROUTES from '../../../constants/routes';
import alertActions from '../../shared/actions/alert';
import userServices from '../services/user';

const login = ({ username, password }) => async dispatch => {
    dispatch(request());

    try {
        await userServices.login({ username, password });
        dispatch(success());
        window.location = ROUTES.HOME;
    } catch {
        dispatch(error());
        dispatch(alertActions.errorWithTimeout(ALERT_MESSAGE.USER.LOGIN_ERROR));
    }

    function request() {
        return { type: LOGIN.REQUEST };
    }
    function success() {
        return { type: LOGIN.SUCCESS };
    }
    function error() {
        return { type: LOGIN.ERROR };
    }
};

const register = ({
    username,
    password,
    email,
    fullName,
    history,
}) => async dispatch => {
    dispatch(request());

    try {
        await userServices.register({
            username,
            password,
            email,
            fullName,
        });
        dispatch(success());
        dispatch(
            alertActions.successWithTimeout(
                ALERT_MESSAGE.USER.REGISTRATION_SUCCESS
            )
        );
        history.push(ROUTES.LOGIN);
    } catch (err) {
        dispatch(error(err));
    }

    function request() {
        return { type: REGISTRATION.REQUEST };
    }
    function success() {
        return { type: REGISTRATION.SUCCESS };
    }
    function error(error) {
        return { type: REGISTRATION.ERROR, payload: error };
    }
};

const clearRegistrationError = () => ({
    type: REGISTRATION.CLEAR_ERROR,
});

export default { login, register, clearRegistrationError };
