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
    addMember,
    removeMember,
} from '../services/projects';

const getCurrentProjectSuccess = (project) => ({
    type: CURRENT_PROJECT.GET_SUCCESS,
    payload: { project },
});

const getCurrentProjectError = () => ({ type: CURRENT_PROJECT.GET_ERROR });

const getCurrentProject = (id) => async (dispatch) => {
    dispatch(startRequest(CURRENT_PROJECT.GET));

    try {
        const { project } = await getProject(id);
        dispatch(getCurrentProjectSuccess(project));
    } catch {
        dispatch(getCurrentProjectError());
    }

    dispatch(endRequest(CURRENT_PROJECT.GET));
};

const updateCurrentProjectSuccess = (project) => ({
    type: CURRENT_PROJECT.UPDATE_SUCCESS,
    payload: { project },
});

const updateCurrentProject = ({
    title,
    description,
    owner,
    projectId,
}) => async (dispatch) => {
    dispatch(startRequest(CURRENT_PROJECT.UPDATE));

    let error = null;
    try {
        const { project } = await updateProject({
            projectId,
            title,
            description,
            owner,
        });
        dispatch(updateCurrentProjectSuccess(project));
    } catch (err) {
        console.error(err);
        error = err;
    }

    dispatch(endRequest(CURRENT_PROJECT.UPDATE));
    return error;
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

const _createTask = ({ title, description, projectId }) => async (dispatch) => {
    dispatch(startRequest(CURRENT_PROJECT.CREATE_TASK));

    try {
        const { task } = await createTask({
            title,
            description,
            projectId,
        });
        dispatch(createTaskSuccess(task));
        dispatch(addSuccessNotification(NOTIFICATIONS.TASK.CREATE_SUCCESS));
    } catch {
        dispatch(addErrorNotification(NOTIFICATIONS.TASK.CREATE_ERROR));
    }

    dispatch(endRequest(CURRENT_PROJECT.CREATE_TASK));
    dispatch(closeModal(MODALS.TASK_CREATE));
};

const addMemberSuccess = (project) => ({
    type: CURRENT_PROJECT.ADD_MEMBER_SUCCESS,
    payload: { project },
});

const _addMember = ({ userId, projectId }) => async (dispatch) => {
    dispatch(startRequest(CURRENT_PROJECT.ADD_MEMBER));

    let error = null;
    try {
        const { project } = await addMember({ userId, projectId });
        dispatch(addMemberSuccess(project));
    } catch (err) {
        console.error(err);
        error = err;
    }

    dispatch(endRequest(CURRENT_PROJECT.ADD_MEMBER));
    return error;
};

const removeMemberSuccess = (project) => ({
    type: CURRENT_PROJECT.REMOVE_MEMBER_SUCCESS,
    payload: { project },
});

const _removeMember = ({ memberId, projectId }) => async (dispatch) => {
    dispatch(startRequest(CURRENT_PROJECT.REMOVE_MEMBER));

    let error = null;
    try {
        const { project } = await removeMember({ memberId, projectId });
        dispatch(removeMemberSuccess(project));
    } catch (err) {
        console.error(err);
        error = err;
    }

    dispatch(endRequest(CURRENT_PROJECT.REMOVE_MEMBER));
    return error;
};

const clearCurrentProject = () => ({ type: CURRENT_PROJECT.CLEAR });

export {
    getCurrentProject,
    updateCurrentProject,
    deleteCurrentProject,
    _createTask as createTask,
    _addMember as addMember,
    _removeMember as removeMember,
    clearCurrentProject,
};
