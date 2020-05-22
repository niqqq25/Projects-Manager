import { PROJECT } from '../constants';

const defaultState = {
    project: null,
    notFound: false,
};

function project(state = defaultState, { type, payload }) {
    switch (type) {
        case PROJECT.GET_SUCCESS:
            return {
                project: payload.project,
                notFound: false,
            };
        case PROJECT.GET_ERROR:
            return {
                ...state,
                notFound: true,
            };
        case PROJECT.CREATE_TASK_SUCCESS:
            return {
                project: {
                    ...state.project,
                    tasks: [...state.project.tasks, payload.task],
                },
            };
        case PROJECT.UPDATE_SUCCESS:
            return {
                project: payload.project,
            };
        default:
            return state;
    }
}

export default project;
