import React from 'react';
import ReactDOM from 'react-dom';
import Router from '../routers/public';

import { Provider } from 'react-redux';
import store from '../redux/public/store';

ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>,
    document.getElementById('root')
);
