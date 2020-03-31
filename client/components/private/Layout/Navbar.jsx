import React, { useContext } from 'react';
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
import { UserContext } from '../../../providers/User';
import { logoutMe } from '../../../actions/user';

const NavigationLink = ({ children, onClick }) => (
    <LinkContainer>
        <Link onClick={onClick}>{children}</Link>
    </LinkContainer>
);

function _Navbar({ history }) {
    const { user } = useContext(UserContext);

    return (
        <Navbar>
            <NavbarInner>
                <UserInfo>{user.username}</UserInfo>
                <NavigationList>
                    <NavigationLink onClick={() => history.push(ROUTES.HOME)}>
                        Home
                    </NavigationLink>
                    <NavigationLink
                        onClick={() => history.push(ROUTES.PROFILE)}
                    >
                        Profile
                    </NavigationLink>
                    <NavigationLink onClick={logoutMe}>Logout</NavigationLink>
                </NavigationList>
            </NavbarInner>
        </Navbar>
    );
}

export default withRouter(_Navbar);
