//constants
import NOTIFICATIONS from '../../../constants/notifications';
import { CURRENT_PROJECT, MODALS } from '../constants';

//actions
import {
    addSuccessNotification,
    addErrorNotification,
} from '../../shared/actions/notifications';
import { startRequest, endRequest } from '../../shared/actions/requests';
import { closeModal } from '../actions/activeModals';

//services
import {
    getProject,
    createTask,
    updateProject,
    deleteProject,
} from '../services/projects';

const getCurrentProjectSuccess = (project) => ({
    type: CURRENT_PROJECT.GET_SUCCESS,
    payload: { project },
});

const getCurrentProject = (id) => async (dispatch) => {
    dispatch(startRequest(CURRENT_PROJECT.GET));

    let error = null;
    try {
        const { project } = await getProject(id);
        dispatch(getCurrentProjectSuccess(project));
    } catch (err) {
        error = err.message;
    }

    dispatch(endRequest(CURRENT_PROJECT.GET));
    return error;
};

const updateCurrentProjectSuccess = (project) => ({
    type: CURRENT_PROJECT.UPDATE_SUCCESS,
    payload: { project },
});

const updateCurrentProject = ({
    title,
    description,
    owner,
    project_id,
}) => async (dispatch) => {
    dispatch(startRequest(CURRENT_PROJECT.UPDATE));

    try {
        const { project } = await updateProject({
            id: project_id,
            title,
            description,
            owner,
        });
        dispatch(updateCurrentProjectSuccess(project));
        dispatch(addSuccessNotification(NOTIFICATIONS.PROJECT.UPDATE_SUCCESS));
    } catch {
        dispatch(addErrorNotification(NOTIFICATIONS.PROJECT.UPDATE_ERROR));
    }

    dispatch(endRequest(CURRENT_PROJECT.UPDATE));
    dispatch(closeModal(MODALS.PROJECT_UPDATE));
};

const deleteCurrentProjectSuccess = () => ({
    type: CURRENT_PROJECT.DELETE_SUCCESS,
});

const deleteCurrentProject = (id) => async (dispatch) => {
    dispatch(startRequest(CURRENT_PROJECT.DELETE));

    let error = null;
    try {
        await deleteProject(id);
        dispatch(deleteCurrentProjectSuccess(id));
        dispatch(addSuccessNotification(NOTIFICATIONS.PROJECT.DELETE_SUCCESS));
    } catch (err) {
        dispatch(addErrorNotification(NOTIFICATIONS.PROJECT.DELETE_ERROR));
        error = err.message;
    }

    dispatch(endRequest(CURRENT_PROJECT.DELETE));
    return error;
};

const createTaskSuccess = (task) => ({
    type: CURRENT_PROJECT.CREATE_TASK_SUCCESS,
    payload: { task },
});

const _createTask = ({ title, description, project_id }) => async (
    dispatch
) => {
    dispatch(startRequest(CURRENT_PROJECT.CREATE_TASK));

    try {
        const { task } = await createTask({
            title,
            description,
            project_id,
        });
        dispatch(createTaskSuccess(task));
        dispatch(addSuccessNotification(NOTIFICATIONS.TASK.CREATE_SUCCESS));
    } catch {
        dispatch(addErrorNotification(NOTIFICATIONS.TASK.CREATE_ERROR));
    }

    dispatch(endRequest(CURRENT_PROJECT.CREATE_TASK));
    dispatch(closeModal(MODALS.TASK_CREATE));   
};

export {
    getCurrentProject,
    updateCurrentProject,
    deleteCurrentProject,
    _createTask as createTask,
};
