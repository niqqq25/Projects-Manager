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

const updateProject = async ({ projectId, title, description, owner }) =>
    await _fetch(`${API_ROUTES.PROJECT.ROOT}/${projectId}`, {
        method: 'PATCH',
        body: { title, description, owner },
    });

const deleteProject = async (id) =>
    await _fetch(`${API_ROUTES.PROJECT.ROOT}/${id}`, {
        method: 'DELETE',
    });

const createTask = async ({ title, description, projectId, parentTask }) =>
    await _fetch(
        `${API_ROUTES.PROJECT.ROOT}/${projectId}${API_ROUTES.PROJECT.TASKS}`,
        { method: 'POST', body: { title, description, parentTask } }
    );

const addMember = async ({ projectId, userId }) =>
    await _fetch(
        `${API_ROUTES.PROJECT.ROOT}/${projectId}${API_ROUTES.PROJECT.MEMBERS}`,
        {
            method: 'POST',
            body: { _id: userId },
        }
    );

const removeMember = async ({ projectId, memberId }) =>
    await _fetch(
        `${API_ROUTES.PROJECT.ROOT}/${projectId}${API_ROUTES.PROJECT.MEMBERS}`,
        { method: 'DELETE', body: { _id: memberId } }
    );

export {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    createTask,
    addMember,
    removeMember,
};
