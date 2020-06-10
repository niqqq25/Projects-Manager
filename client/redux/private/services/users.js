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

const getNonMemberUsers = async ({ query, limit, projectId }) => {
    const searchParams = new URLSearchParams({
        q: query || '',
        limit: limit || '',
        isMembers: false,
        project: projectId,
    });

    return await _fetch(`${API_ROUTES.USER.ROOT}?${searchParams}`);
};

export {
    logoutCurrentUser,
    getCurrentUser,
    updateCurrentUser,
    deleteCurrentUser,
    getNonMemberUsers,
};
