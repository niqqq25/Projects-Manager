import React from 'react';

import {
    Team,
    TeamTitle,
    TeamAvatars,
    AvatarWrapper,
} from './styled/ProjectCardTeam';
import { Avatar, Tooltip } from '../../global';

const ProjectCardTeam = ({ members }) => (
    <Team>
        <TeamTitle>Team:</TeamTitle>
        <TeamAvatars>
            {members.map(({ avatarUrl, username }, index) => (
                <Tooltip content={username} key={index}>
                    <AvatarWrapper>
                        <Avatar src={avatarUrl} />
                    </AvatarWrapper>
                </Tooltip>
            ))}
        </TeamAvatars>
    </Team>
);

export default ProjectCardTeam;
