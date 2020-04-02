import API_ROUTES from '../../../../shared/routes';
import _fetch from '../../../helpers/fetch';

const logout = async () =>
    await _fetch(`${API_ROUTES.USER.ROOT}${API_ROUTES.USER.LOGOUT}`);

const get = async () => _fetch(`${API_ROUTES.USER.ROOT}${API_ROUTES.USER.ME}`);

const update = async ({ fullName, password }) =>
    await _fetch(`${API_ROUTES.USER.ROOT}${API_ROUTES.USER.ME}`, {
        method: 'PATCH',
        body: { fullName, password: password },
    });

const _delete = async () =>
    await _fetch(`${API_ROUTES.USER.ROOT}${API_ROUTES.USER.ME}`, {
        method: 'DELETE',
    });

export default { logout, get, update, _delete };
