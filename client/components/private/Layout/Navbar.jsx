import React from 'react';
import { withRouter } from 'react-router-dom';
import {
    Navbar,
    NavbarInner,
    UserInfo,
    NavigationList,
    LinkContainer,
} from './styles/Navbar';
import { Link } from '../../global';
import ROUTES from '../../../constants/routes';

const NavigationLink = ({ children, onClick }) => (
    <LinkContainer>
        <Link onClick={onClick}>{children}</Link>
    </LinkContainer>
);

function _Navbar({ history, username, logoutUser }) {
    return (
        <Navbar>
            <NavbarInner>
                <UserInfo>{username}</UserInfo>
                <NavigationList>
                    <NavigationLink onClick={() => history.push(ROUTES.HOME)}>
                        Home
                    </NavigationLink>
                    <NavigationLink
                        onClick={() => history.push(ROUTES.PROFILE)}
                    >
                        Profile
                    </NavigationLink>
                    <NavigationLink onClick={logoutUser}>Logout</NavigationLink>
                </NavigationList>
            </NavbarInner>
        </Navbar>
    );
}

export default withRouter(_Navbar);
