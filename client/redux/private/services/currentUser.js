import API_ROUTES from '../../../../shared/routes';
import _fetch from '../../../helpers/fetch';

const logoutCurrentUser = async () =>
    await _fetch(`${API_ROUTES.USER.ROOT}${API_ROUTES.USER.LOGOUT}`);

const getCurrentUser = async () =>
    _fetch(`${API_ROUTES.USER.ROOT}${API_ROUTES.USER.ME}`);

const updateCurrentUser = async ({ fullName, password }) =>
    await _fetch(`${API_ROUTES.USER.ROOT}${API_ROUTES.USER.ME}`, {
        method: 'PATCH',
        body: { fullName, password: password },
    });

const deleteCurrentUser = async () =>
    await _fetch(`${API_ROUTES.USER.ROOT}${API_ROUTES.USER.ME}`, {
        method: 'DELETE',
    });

export {
    logoutCurrentUser,
    getCurrentUser,
    updateCurrentUser,
    deleteCurrentUser,
};
