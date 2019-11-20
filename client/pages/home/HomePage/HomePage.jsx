import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './homePage.css';

import * as UserAPI from '../../../requests/user';

import Header from '../../../sharedComponents/Header/Header';
import Projects from '../Projects/Projects';
import Spinner from '../../../sharedComponents/Spinner/Spinner';

export default function HomePage(props) {
    const [user, setUser] = useState(null);
    const [loginRedirect, setLoginRedirect] = useState(false);

    useEffect(() => {
        setUser({firstname: 'Fake', secondname: 'Forreal'});
        // getUser();
    }, []);

    async function getUser() {
        const response = await UserAPI.getMe();

        if (response.error) {
            setLoginRedirect(true);
        } else {
            setUser(response);
        }
    }

    return (
        <div id="home-page">
            {user ? (
                <>
                    <Header
                        firstname={user.firstname}
                        secondname={user.secondname}
                        company={user.company}
                    />
                    <Projects />
                </>
            ) : (
                <Spinner page></Spinner>
            )}
            {loginRedirect && (
                <Redirect
                    to={{
                        pathname: '/login',
                        search: 'authFail=true',
                    }}
                />
            )}
        </div>
    );
}
