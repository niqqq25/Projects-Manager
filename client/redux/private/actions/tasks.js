// import ALERT_MESSAGE from '../../../constants/alerts';
// import { PROJECTS } from '../constants';

// import alertActions from '../../shared/actions/alert';
// import requestingActions from '../actions/requesting';
// import projectCreateModelActions from '../actions/projectCreateModal';

// import projectsServices from '../services/projects';

// export const GET_PROJECTS = 'projects/GET';
// const getAll = () => async dispatch => {
//     dispatch(requestingActions.start(GET_PROJECTS));

//     try {
//         const { projects } = await projectsServices.getAll();
//         dispatch(success(projects));
//     } catch (err) {
//         dispatch(error(err));
//     }

//     function success(projects) {
//         dispatch(requestingActions.end(GET_PROJECTS));
//         return { type: PROJECTS.GET_SUCCESS, payload: { projects } };
//     }
//     function error(error) {
//         dispatch(requestingActions.end(GET_PROJECTS));
//         return { type: PROJECTS.GET_ERROR, payload: { error } };
//     }
// };

// export const CREATE_PROJECTS = 'projects/CREATE';
// const create = ({ title, description }) => async dispatch => {
//     dispatch(requestingActions.start(CREATE_PROJECTS));

//     try {
//         const { project } = await projectsServices.create({
//             title,
//             description,
//         });
//         dispatch(success(project));
//     } catch {
//         error();
//     }

//     function success(project) {
//         complete();
//         dispatch(
//             alertActions.successWithTimeout(
//                 ALERT_MESSAGE.PROJECT.CREATE_SUCCESS
//             )
//         );
//         return { type: PROJECTS.CREATE_SUCCESS, payload: { project } };
//     }
//     function error(error) {
//         complete();
//         dispatch(
//             alertActions.errorWithTimeout(ALERT_MESSAGE.PROJECT.CREATE_ERROR)
//         );
//     }
//     function complete() {
//         dispatch(requestingActions.end(CREATE_PROJECTS));
//         dispatch(projectCreateModelActions.close());
//     }
// };

// export default { getAll, create };