import React from 'react';
import { withRouter } from 'react-router-dom';
import {
    Navbar,
    NavigationList,
    ListItem,
    UserInfoWrapper,
    UserFullname,
    navigationLink,
} from './styles/Navbar';
import { Avatar, Link } from '../../global';
import ROUTES from '../../../constants/routes';

import { useSelector } from 'react-redux';

function _Navbar({ history, fullName, avatarUrl, logoutUser }) {
    const { isProjectsPageActive, isProfilePageActive } = useSelector(
        ({ navbar }) => navbar
    );

    return (
        <Navbar>
            <UserInfoWrapper>
                <Avatar size={40} src={avatarUrl} />
                <UserFullname>{fullName}</UserFullname>
            </UserInfoWrapper>
            <NavigationList>
                <ListItem>
                    <Link
                        isActive={isProjectsPageActive}
                        _css={navigationLink}
                        onClick={() => history.push(ROUTES.PROJECTS)}
                    >
                        Projects
                    </Link>
                </ListItem>
                <ListItem>
                    <Link
                        isActive={isProfilePageActive}
                        _css={navigationLink}
                        onClick={() => history.push(ROUTES.PROFILE)}
                    >
                        Profile
                    </Link>
                </ListItem>
                <ListItem>
                    <Link _css={navigationLink} onClick={logoutUser}>
                        Logout
                    </Link>
                </ListItem>
            </NavigationList>
        </Navbar>
    );
}

export default withRouter(_Navbar);
