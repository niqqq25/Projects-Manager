import API_ROUTES from '../../../../shared/routes';
import _fetch from '../../../helpers/fetch';

const getTask = async (id) => await _fetch(`${API_ROUTES.TASK.ROOT}/${id}`);

const updateTask = async ({ taskId, updates }) =>
    await _fetch(`${API_ROUTES.TASK.ROOT}/${taskId}`, {
        method: 'PATCH',
        body: updates,
    });

const deleteTask = async (id) =>
    await _fetch(`${API_ROUTES.TASK.ROOT}/${id}`, {
        method: 'DELETE',
    });

export { getTask, updateTask, deleteTask };
