import CURRENT_PROJECT from '../constants/currentProject';

function currentProject(state = null, { type, payload }) {
    switch (type) {
        case CURRENT_PROJECT.GET_SUCCESS:
        case CURRENT_PROJECT.UPDATE_SUCCESS:
            return payload.project;
        case CURRENT_PROJECT.DELETE_SUCCESS:
            return null;
        case CURRENT_PROJECT.CREATE_TASK_SUCCESS:
            return {
                ...state,
                tasks: [...state.tasks, payload.task],
            };
        default:
            return state;
    }
}

export default currentProject;
