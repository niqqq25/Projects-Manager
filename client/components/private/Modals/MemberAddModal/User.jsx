import React from 'react';
import {
    User,
    LeftSide,
    RightSide,
    UserInfo,
    UserUsername,
    UserFullName,
} from './styles/User';
import Avatar from '../../../global/Avatar';
import MemberAddButton from './MemberAddButton';

function _User({ user, projectId }) {
    const { avatarUrl, username, fullName, _id: userId } = user;
    return (
        <User>
            <LeftSide>
                <Avatar size={34} src={avatarUrl} />
                <UserInfo>
                    <UserUsername>{username}</UserUsername>
                    <UserFullName>{fullName}</UserFullName>
                </UserInfo>
            </LeftSide>
            <RightSide>
                <MemberAddButton
                    userId={userId}
                    username={username}
                    projectId={projectId}
                />
            </RightSide>
        </User>
    );
}

export default _User;
