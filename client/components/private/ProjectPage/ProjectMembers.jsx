import React from 'react';

import {
    Members,
    MembersTitle,
    MembersAvatars,
    memberAvatar,
} from './styles/ProjectMembers';
import { Avatar, Tooltip } from '../../global';
import MemberAddButton from './MemberAddButton';

import { useSelector } from 'react-redux';

function ProjectMemebers({ members, owner }) {
    const currentUser = useSelector(({ currentUser }) => currentUser);
    const isOwner = currentUser._id === owner._id;

    return (
        <Members>
            <MembersTitle>Members</MembersTitle>
            <MembersAvatars>
                {members.map(({ avatarUrl, username }, index) => (
                    <Tooltip content={username} key={index}>
                        <Avatar _css={memberAvatar} src={avatarUrl} size={40} />
                    </Tooltip>
                ))}
                {isOwner && <MemberAddButton />}
            </MembersAvatars>
        </Members>
    );
}

export default ProjectMemebers;
