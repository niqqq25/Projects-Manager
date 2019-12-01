import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

import { UserContext } from '../../providers/UserProvider';

import Cookies from 'js-cookie';

export default function Header(props) {
    const { user } = useContext(UserContext);

    function handleLogout() {
        Cookies.remove('access_token', {path: '/'});
    }

    return (
        <div id="header-wrapper">
            <div id="header-border">
                <div id="header">
                    <div id="me">
                        {user.company
                            ? user.company
                            : `${user.firstname} ${user.secondname}`}
                    </div>
                    <ul id="navigation">
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li>
                            <Link to="/login" onClick={handleLogout}>
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
