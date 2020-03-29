import React from 'react';
import ReactDOM from 'react-dom';
import Router from '../routers/public';
import { AlertMessageProvider } from '../providers/AlertMessage';

ReactDOM.render(
    <AlertMessageProvider>
        <Router />
    </AlertMessageProvider>,
    document.getElementById('root')
);
