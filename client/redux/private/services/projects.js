import API_ROUTES from '../../../../shared/routes';
import _fetch from '../../../helpers/fetch';

const getProjects = async () => await _fetch(API_ROUTES.PROJECT.ROOT);

const getProject = async (id) =>
    await _fetch(`${API_ROUTES.PROJECT.ROOT}/${id}`);

const createProject = async ({ title, description }) =>
    await _fetch(API_ROUTES.PROJECT.ROOT, {
        method: 'POST',
        body: { title, description },
    });

const updateProject = async ({ id, title, description, owner }) =>
    await _fetch(`${API_ROUTES.PROJECT.ROOT}/${id}`, {
        method: 'PATCH',
        body: { title, description, owner },
    });

const deleteProject = async ({ id }) =>
    await _fetch(`${API_ROUTES.PROJECT.ROOT}/${id}`, {
        method: 'DELETE',
    });

const createTask = async ({ title, description, project_id }) =>
    await _fetch(
        `${API_ROUTES.PROJECT.ROOT}/${project_id}${API_ROUTES.PROJECT.TASKS}`,
        { method: 'POST', body: { title, description } }
    );

export {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    createTask,
};
