import React from 'react';
import { withRouter } from 'react-router-dom';
import {
    Navbar,
    NavigationList,
    ListItem,
    NavigationLink,
    UserInfoWrapper,
    UserFullname,
} from './styled/Navbar';
import Avatar from '../../global/Avatar';
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
                    <NavigationLink
                        isActive={isProjectsPageActive}
                        onClick={() => history.push(ROUTES.PROJECTS)}
                    >
                        Projects
                    </NavigationLink>
                </ListItem>
                <ListItem>
                    <NavigationLink
                        isActive={isProfilePageActive}
                        onClick={() => history.push(ROUTES.PROFILE)}
                    >
                        Profile
                    </NavigationLink>
                </ListItem>
                <ListItem>
                    <NavigationLink onClick={logoutUser}>Logout</NavigationLink>
                </ListItem>
            </NavigationList>
        </Navbar>
    );
}

export default withRouter(_Navbar);
