import { combineReducers } from 'redux';

import requesting from './requesting';
import currentUser from './currentUser';
import confirmation from './confirmation';
import projects from './projects';
import projectCreateModal from './projectCreateModal';
import project from './project';
import tasks from './tasks';
import taskCreateModal from './taskCreateModal';
import projectEditModal from './projectEditModal';

//shared
//TODO move request from shared
import notifications from '../../shared/reducers/notifications';

const rootReducer = combineReducers({
    notifications,
    requesting,
    currentUser,
    confirmation,
    projects,
    project,
    projectCreateModal,
    tasks,
    taskCreateModal,
    projectEditModal,
});

export default rootReducer;
