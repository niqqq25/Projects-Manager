import React from 'react';
import { withRouter } from 'react-router-dom';
import {
    Navbar,
    NavigationList,
    LinkWrapper,
    UserWrapper,
    UserAvatar,
    UserFullname,
} from './styles/Navbar';
import { Link } from '../../global';
import ROUTES from '../../../constants/routes';

const NavigationLink = ({ children, onClick }) => (
    <LinkWrapper>
        <Link onClick={onClick} styles={{ hoverColor: 'white' }}>
            {children}
        </Link>
    </LinkWrapper>
);

function _Navbar({ history, fullName, logoutUser }) {
    return (
        <Navbar>
            <UserWrapper>
                <UserAvatar src="https://homepages.cae.wisc.edu/~ece533/images/zelda.png" />
                <UserFullname>{fullName}</UserFullname>
            </UserWrapper>
            <NavigationList>
                <NavigationLink onClick={() => history.push(ROUTES.HOME)}>
                    Home
                </NavigationLink>
                <NavigationLink onClick={() => history.push(ROUTES.PROFILE)}>
                    Profile
                </NavigationLink>
                <NavigationLink onClick={logoutUser}>Logout</NavigationLink>
            </NavigationList>
        </Navbar>
    );
}

export default withRouter(_Navbar);
