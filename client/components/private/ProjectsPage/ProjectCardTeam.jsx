import React from 'react';

import {
    Team,
    TeamTitle,
    TeamAvatars,
    memberAvatar,
} from './styles/ProjectCardTeam';
import { Avatar, Tooltip } from '../../global';

const ProjectCardTeam = ({ members }) => (
    <Team>
        <TeamTitle>Team:</TeamTitle>
        <TeamAvatars>
            {members.map(({ avatarUrl, username }, index) => (
                <Tooltip content={username} key={index}>
                    <Avatar src={avatarUrl} _css={memberAvatar} />
                </Tooltip>
            ))}
        </TeamAvatars>
    </Team>
);

export default ProjectCardTeam;
