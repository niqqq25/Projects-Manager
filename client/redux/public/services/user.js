import API_ROUTES from '../../../../shared/routes';
import _fetch from '../../../helpers/fetch';

const login = async ({ username, password }) =>
    await _fetch(`${API_ROUTES.USER.ROOT}${API_ROUTES.USER.LOGIN}`, {
        method: 'POST',
        body: { username, password },
    });

const register = async ({ username, password, email, fullName }) =>
    await _fetch(`${API_ROUTES.USER.ROOT}`, {
        method: 'POST',
        body: { username, password, email, fullName },
    });

export default { login, register };
