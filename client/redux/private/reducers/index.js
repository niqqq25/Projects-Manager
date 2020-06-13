import { combineReducers } from 'redux';

import currentUser from './currentUser';
import projects from './projects';
import currentProject from './currentProject';
import currentTask from './currentTask';
import activeModals from './activeModals';
import navbar from './navbar';
import memberAddModal from './memberAddModal';
import assigneeManageModal from './assigneeManageModal';

//shared
import notifications from '../../shared/reducers/notifications';
import requests from '../../shared/reducers/requests';

const rootReducer = combineReducers({
    notifications,
    requests,
    currentUser,
    projects,
    currentProject,
    currentTask,
    activeModals,
    navbar,
    memberAddModal,
    assigneeManageModal,
});

export default rootReducer;
