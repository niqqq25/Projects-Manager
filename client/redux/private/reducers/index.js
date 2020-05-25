import { combineReducers } from 'redux';

import currentUser from './currentUser';
import confirmation from './confirmation';
import projects from './projects';
import currentProject from './currentProject';
import tasks from './tasks';
import activeModals from './activeModals';

//shared
import notifications from '../../shared/reducers/notifications';
import requests from '../../shared/reducers/requests';

const rootReducer = combineReducers({
    notifications,
    requests,
    currentUser,
    confirmation,
    projects,
    currentProject,
    tasks,
    activeModals,
});

export default rootReducer;
