import NOTIFICATIONS from '../../../constants/notifications';
import { PROJECT } from '../constants';

import {
    addSuccessNotification,
    addErrorNotification,
} from '../../shared/actions/notifications';
import requestingActions from '../actions/requesting';
import taskCreateModelActions from '../actions/taskCreateModal';
import projectEditModalActions from '../actions/projectEditModal';

import projectsServices from '../services/projects';

export const GET_PROJECT = 'project/GET';
const get = (id) => async (dispatch) => {
    dispatch(requestingActions.start(GET_PROJECT));

    try {
        const { project } = await projectsServices.get(id);
        dispatch(success(project));
    } catch {
        dispatch(error());
    }

    function success(project) {
        dispatch(requestingActions.end(GET_PROJECT));
        return { type: PROJECT.GET_SUCCESS, payload: { project } };
    }
    function error() {
        dispatch(requestingActions.end(GET_PROJECT));
        return { type: PROJECT.GET_ERROR };
    }
};

export const CREATE_TASK = 'project/CREATE_TASK';
const createTask = ({ title, description, project_id }) => async (dispatch) => {
    dispatch(requestingActions.start(CREATE_TASK));

    try {
        const { task } = await projectsServices.createTask({
            title,
            description,
            project_id,
        });
        dispatch(success(task));
    } catch (err) {
        error();
    }

    function success(task) {
        complete();
        dispatch(
            addSuccessNotification(
                NOTIFICATIONS.TASK.CREATE_SUCCESS
            )
        );
        return { type: PROJECT.CREATE_TASK_SUCCESS, payload: { task } };
    }
    function error() {
        complete();
        dispatch(
            addErrorNotification(NOTIFICATIONS.TASK.CREATE_ERROR)
        );
    }
    function complete() {
        dispatch(requestingActions.end(CREATE_TASK));
        dispatch(taskCreateModelActions.close());
    }
};

export const UPDATE_PROJECT = 'project/UPDATE_PROJECT';
const update = ({ title, description, owner, project_id }) => async (
    dispatch
) => {
    dispatch(requestingActions.start(UPDATE_PROJECT));

    try {
        const { project } = await projectsServices.update({
            id: project_id,
            title,
            description,
            owner,
        });
        dispatch(success(project));
    } catch {
        error();
    }

    function success(project) {
        complete();
        dispatch(
            addSuccessNotification(
                NOTIFICATIONS.PROJECT.UPDATE_SUCCESS
            )
        );
        return { type: PROJECT.UPDATE_SUCCESS, payload: { project } };
    }
    function error() {
        complete();
        dispatch(
            addErrorNotification(NOTIFICATIONS.PROJECT.UPDATE_ERROR)
        );
    }
    function complete() {
        dispatch(requestingActions.end(UPDATE_PROJECT));
        dispatch(projectEditModalActions.close());
    }
};

export default { get, createTask, update };
