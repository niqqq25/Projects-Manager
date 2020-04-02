import React from 'react';
import ReactDOM from 'react-dom';
import Router from '../routers/private';

import { Provider } from 'react-redux';
import store from '../redux/private/store';

ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>,
    document.getElementById('root')
);
