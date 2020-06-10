import React from 'react';
import {
    Member,
    LeftSide,
    RightSide,
    MemberInfo,
    MemberUsername,
    MemberFullName,
} from './styled/Member';
import Avatar from '../../../global/Avatar';
import MemberRemoveButton from './MemberRemoveButton';
import OwnerChangeButton from './OwnerChangeButton';

function _Member({ member, projectId }) {
    const { avatarUrl, username, fullName, _id: memberId } = member;
    return (
        <Member>
            <LeftSide>
                <Avatar size={34} src={avatarUrl} />
                <MemberInfo>
                    <MemberUsername>{username}</MemberUsername>
                    <MemberFullName>{fullName}</MemberFullName>
                </MemberInfo>
            </LeftSide>
            <RightSide>
                <OwnerChangeButton
                    memberId={memberId}
                    projectId={projectId}
                    username={username}
                />
                <MemberRemoveButton
                    memberId={memberId}
                    projectId={projectId}
                    username={username}
                />
            </RightSide>
        </Member>
    );
}

export default _Member;
