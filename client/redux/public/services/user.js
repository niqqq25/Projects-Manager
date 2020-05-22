import API_ROUTES from '../../../../shared/routes';
import _fetch from '../../../helpers/fetch';

const loginUser = async ({ username, password }) =>
    await _fetch(`${API_ROUTES.USER.ROOT}${API_ROUTES.USER.LOGIN}`, {
        method: 'POST',
        body: { username, password },
    });

const registerUser = async ({ username, password, email, fullName }) =>
    await _fetch(`${API_ROUTES.USER.ROOT}`, {
        method: 'POST',
        body: { username, password, email, fullName },
    });

export { loginUser, registerUser };
