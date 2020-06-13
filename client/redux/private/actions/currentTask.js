//constants
import NOTIFICATIONS from '../../../constants/notifications';
import { CURRENT_TASK, MODALS } from '../constants';

//actions
import {
    addSuccessNotification,
    addErrorNotification,
} from '../../shared/actions/notifications';
import { startRequest, endRequest } from '../../shared/actions/requests';
import { closeModal } from '../actions/activeModals';

//services
import { getTask, updateTask, deleteTask } from '../services/tasks';
import { createTask } from '../services/projects';

const getCurrentTaskSuccess = (task) => ({
    type: CURRENT_TASK.GET_SUCCESS,
    payload: { task },
});

const getCurrentTaskError = () => ({ type: CURRENT_TASK.GET_ERROR });

const getCurrentTask = (id) => async (dispatch) => {
    dispatch(startRequest(CURRENT_TASK.GET));

    try {
        const { task } = await getTask(id);
        dispatch(getCurrentTaskSuccess(task));
    } catch (err) {
        dispatch(getCurrentTaskError());
    }

    dispatch(endRequest(CURRENT_TASK.GET));
};

const createTaskSuccess = (task) => ({
    type: CURRENT_TASK.CREATE_SUCCESS,
    payload: { task },
});

const _createTask = ({ title, description, projectId, parentTask }) => async (
    dispatch
) => {
    dispatch(startRequest(CURRENT_TASK.CREATE));

    try {
        const { task } = await createTask({
            title,
            description,
            projectId,
            parentTask,
        });
        dispatch(createTaskSuccess(task));
        dispatch(addSuccessNotification(NOTIFICATIONS.TASK.CREATE_SUCCESS));
    } catch {
        dispatch(addErrorNotification(NOTIFICATIONS.TASK.CREATE_ERROR));
    }

    dispatch(endRequest(CURRENT_TASK.CREATE));
    dispatch(closeModal(MODALS.TASK_CREATE));
};

const deleteCurrentTaskSuccess = () => ({
    type: CURRENT_TASK.DELETE_SUCCESS,
});

const deleteCurrentTask = (id) => async (dispatch) => {
    dispatch(startRequest(CURRENT_TASK.DELETE));

    let error = null;
    try {
        await deleteTask(id);
        dispatch(deleteCurrentTaskSuccess());
        dispatch(addSuccessNotification(NOTIFICATIONS.TASK.DELETE_SUCCESS));
    } catch (err) {
        dispatch(addErrorNotification(NOTIFICATIONS.TASK.DELETE_ERROR));
        error = err;
    }

    dispatch(endRequest(CURRENT_TASK.DELETE));
    return error;
};

const updateCurrentTaskSuccess = (task) => ({
    type: CURRENT_TASK.UPDATE_SUCCESS,
    payload: { task },
});

const updateCurrentTask = ({ taskId, updates }) => async (dispatch) => {
    dispatch(startRequest(CURRENT_TASK.UPDATE));

    let error = null;
    try {
        const { task } = await updateTask({ taskId, updates });
        dispatch(updateCurrentTaskSuccess(task));
        dispatch(addSuccessNotification(NOTIFICATIONS.TASK.UPDATE_SUCCESS));
    } catch (err) {
        dispatch(addErrorNotification(NOTIFICATIONS.TASK.UPDATE_ERROR));
        erorr = err;
    }

    dispatch(endRequest(CURRENT_TASK.UPDATE));
    return error;
};

const clearCurrentTask = () => ({
    type: CURRENT_TASK.CLEAR,
});

export {
    getCurrentTask,
    clearCurrentTask,
    _createTask as createTask,
    deleteCurrentTask,
    updateCurrentTask,
};
