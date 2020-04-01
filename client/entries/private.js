import React from 'react';
import ReactDOM from 'react-dom';
import Router from '../routers/private';

import { UserProvider } from '../providers/User';
import { AlertMessageProvider } from '../providers/AlertMessage';
import { ConfirmationModalProvider } from '../providers/ConfirmationModalProvider';

ReactDOM.render(
    <AlertMessageProvider>
        <UserProvider>
            <ConfirmationModalProvider>
                <Router />
            </ConfirmationModalProvider>
        </UserProvider>
    </AlertMessageProvider>,
    document.getElementById('root')
);
