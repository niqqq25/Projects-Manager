import React, { useContext } from 'react';
import Styled from './Header.styles';
import { NavLink } from 'react-router-dom';

import { UserContext } from '../../providers/UserProvider';

const NavigationLink = ({ children, to, onClick }) => (
    <Styled.NavigationList__Link>
        <NavLink
            to={to}
            style={{ color: 'inherit', textDecoration: 'none' }}
            onClick={onClick}
        >
            {children}
        </NavLink>
    </Styled.NavigationList__Link>
);

export default function Header() {
    const { user, logoutUser } = useContext(UserContext);

    return (
        <Styled.Header>
            <Styled.Header__Inner>
                <Styled.Header__UserName>
                    {user.company
                        ? user.company
                        : `${user.firstname} ${user.secondname}`}
                </Styled.Header__UserName>
                <Styled.Header__NavigationList>
                    <NavigationLink to="/home">Home</NavigationLink>
                    <NavigationLink to="/profile">Profile</NavigationLink>
                    <NavigationLink onClick={logoutUser} to="/login">
                        Logout
                    </NavigationLink>
                </Styled.Header__NavigationList>
            </Styled.Header__Inner>
        </Styled.Header>
    );
}
