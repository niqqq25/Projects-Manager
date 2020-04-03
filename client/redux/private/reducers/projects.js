import { PROJECTS } from '../constants';

const defaultState = {
    projects: [],
    error: null,
};

function projects(state = defaultState, { type, payload }) {
    switch (type) {
        case PROJECTS.GET_SUCCESS:
            return {
                projects: payload.projects,
                error: null,
            };
        case PROJECTS.GET_ERROR:
            return {
                ...state,
                error: payload.error,
            };
        case PROJECTS.CREATE_SUCCESS:
            return {
                ...state,
                projects: [...state.projects, payload.project],
            };
        default:
            return state;
    }
}

export default projects;
