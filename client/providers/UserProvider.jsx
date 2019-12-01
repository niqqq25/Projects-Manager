import React, { createContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import * as UserAPI from '../requests/user';
import Cookies from 'js-cookie';

import Spinner from '../sharedComponents/Spinner/Spinner';

const UserContext = createContext(null);

function UserProvider({ children, history }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (Cookies.get('access_token')) {
            getUser();
        } else {
            history.push('/login');
        }
    }, []);

    async function getUser() {
        const response = await UserAPI.getMe();

        if (response.error) {
            Cookies.remove('access_token', { path: '/' });
            history.push({ pathname: '/login', state: { authFailed: true } });
        } else {
            setUser(response);
        }
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {user ? children : <Spinner page />}
        </UserContext.Provider>
    );
}

const UserProviderWithRouter = withRouter(UserProvider);

export { UserProviderWithRouter, UserContext };
