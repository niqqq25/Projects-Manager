import React, { useState, useEffect, createContext } from 'react';
import styled from 'styled-components';
import { Spinner } from '../components/global';
import { getMe, updateMe } from '../actions/user';

const SpinnerContainer = styled.div`
    position: absolute;
    width: 50px;
    height: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const UserContext = createContext(null);

function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser();
    }, []);

    async function getUser() {
        const { user } = await getMe();
        setUser(user);
    }

    async function updateUser({ fullName, password }) {
        const res = await updateMe({ fullName, password });
        if (res.user) {
            setUser(res.user);
        }
        return res;
    }

    return (
        <UserContext.Provider value={{ user, updateUser }}>
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

export { UserContext, UserProvider };
