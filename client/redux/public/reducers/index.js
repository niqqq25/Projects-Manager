import { combineReducers } from 'redux';

//shared
import notifications from '../../shared/reducers/notifications';
import requests from '../../shared/reducers/requests';

const rootReducer = combineReducers({
    notifications,
    requests,
});

export default rootReducer;
