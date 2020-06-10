import CURRENT_PROJECT from '../constants/currentProject';

const defaultState = { project: null, notFound: false };

function currentProject(state = defaultState, { type, payload }) {
    switch (type) {
        case CURRENT_PROJECT.GET_SUCCESS:
        case CURRENT_PROJECT.UPDATE_SUCCESS:
        case CURRENT_PROJECT.ADD_MEMBER_SUCCESS:
        case CURRENT_PROJECT.REMOVE_MEMBER_SUCCESS:
            return { notFound: false, project: payload.project };

        case CURRENT_PROJECT.GET_ERROR:
            return { notFound: true, project: null };

        case CURRENT_PROJECT.CREATE_TASK_SUCCESS:
            return {
                notFound: false,
                project: {
                    ...state.project,
                    tasks: [...state.project.tasks, payload.task],
                },
            };

        case CURRENT_PROJECT.DELETE_SUCCESS:
        case CURRENT_PROJECT.CLEAR:
            return defaultState;
        default:
            return state;
    }
}

export default currentProject;
