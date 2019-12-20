import React, { createContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';

import UserAPI from '../requests/user';
import Spinner from '../sharedComponents/Spinner';

const SpinnerContainer = styled.div`
    position: absolute;
    width: 50px;
    height: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

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

    function logoutUser() {
        Cookies.remove('access_token', { path: '/' });
    }

    return (
        <UserContext.Provider value={{ user, setUser, logoutUser }}>
            {user ? (
                children
            ) : (
                <SpinnerContainer>
                    <Spinner />
                </SpinnerContainer>
            )}
        </UserContext.Provider>
    );
}

const UserProviderWithRouter = withRouter(UserProvider);

export { UserProviderWithRouter, UserContext };
