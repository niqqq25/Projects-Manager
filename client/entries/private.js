import React from 'react';
import ReactDOM from 'react-dom';
import Router from '../routers/private';

import { UserProvider } from '../providers/User';
import { AlertMessageProvider } from '../providers/AlertMessage';

ReactDOM.render(
    <AlertMessageProvider>
        <UserProvider>
            <Router />
        </UserProvider>
    </AlertMessageProvider>,
    document.getElementById('root')
);
