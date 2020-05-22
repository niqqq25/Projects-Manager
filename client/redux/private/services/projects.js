import API_ROUTES from '../../../../shared/routes';
import _fetch from '../../../helpers/fetch';

const getAll = async () => await _fetch(API_ROUTES.PROJECT.ROOT);

const get = async id => await _fetch(`${API_ROUTES.PROJECT.ROOT}/${id}`);

const create = async ({ title, description }) =>
    await _fetch(API_ROUTES.PROJECT.ROOT, {
        method: 'POST',
        body: { title, description },
    });

const update = async ({ id, title, description, owner }) =>
    await _fetch(`${API_ROUTES.PROJECT.ROOT}/${id}`, {
        method: 'PATCH',
        body: { title, description, owner },
    });

const createTask = async ({ title, description, project_id }) =>
    await _fetch(
        `${API_ROUTES.PROJECT.ROOT}/${project_id}${API_ROUTES.PROJECT.TASKS}`,
        { method: 'POST', body: { title, description } }
    );

export default { getAll, get, create, update, createTask };
