import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './header.css';

import * as Cookie from '../../utils/cookie';

export default function Header(props) {
    const {firstname, secondname, company} = props;
    const [loginRedirect, setLoginRedirect] = useState(false);
    const [homeRedirect, setHomeRedirect] = useState(false);
    const [profileRedirect, setProfileRedirect] = useState(false);

    function handleLogout() {
        Cookie.remove('access_token');
        setLoginRedirect(true);
    }

    return (
        <div id="header-wrapper">
            <div id="header">
                <div id="me">{company ? company : `${firstname} ${secondname}`}</div>
                <ul id="navigation">
                    <li onClick={() => setHomeRedirect(true)}>Home</li>
                    <li onClick={() => setProfileRedirect(true)}>Profile</li>
                    <li onClick={handleLogout}>Logout</li>
                </ul>
            </div>
            {loginRedirect && <Redirect to="/login" />}
            {homeRedirect && <Redirect to="/home" />}
            {profileRedirect && <Redirect to="/profile" />}
        </div>
    );
}
