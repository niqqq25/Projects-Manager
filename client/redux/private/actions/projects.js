//constants
import NOTIFICATIONS from '../../../constants/notifications';
import { PROJECTS, MODALS } from '../constants';

//actions
import {
    addSuccessNotification,
    addErrorNotification,
} from '../../shared/actions/notifications';
import { startRequest, endRequest } from '../../shared/actions/requests';
import { closeModal } from '../actions/activeModals';

//services
import { getProjects, createProject } from '../services/projects';

const getProjectsSuccess = (projects) => ({
    type: PROJECTS.GET_SUCCESS,
    payload: { projects },
});

const _getProjects = () => async (dispatch) => {
    dispatch(startRequest(PROJECTS.GET));

    try {
        const { projects } = await getProjects();
        dispatch(getProjectsSuccess(projects));
    } catch (err) {
        dispatch(addErrorNotification(NOTIFICATIONS.PROJECT.GET_ALL_ERROR))
    }

    dispatch(endRequest(PROJECTS.GET));
};

const createProjectSuccess = (project) => ({
    type: PROJECTS.CREATE_SUCCESS,
    payload: { project },
});

const _createProject = ({ title, description }) => async (dispatch) => {
    dispatch(startRequest(PROJECTS.CREATE));

    try {
        const { project } = await createProject({ title, description });
        dispatch(createProjectSuccess(project));
        dispatch(addSuccessNotification(NOTIFICATIONS.PROJECT.CREATE_SUCCESS));
    } catch {
        dispatch(addErrorNotification(NOTIFICATIONS.PROJECT.CREATE_ERROR));
    }

    dispatch(endRequest(PROJECTS.CREATE));
    dispatch(closeModal(MODALS.PROJECT_CREATE));
};

export { _getProjects as getProjects, _createProject as createProject };
