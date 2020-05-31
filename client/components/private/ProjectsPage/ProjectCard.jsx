import React from 'react';
import {
    ProjectCard,
    ProjectName,
    ProjectDescription,
    ProjectInfoWrapper,
    ProjectTeam,
    ProjectTeamTitle,
    ProjectTeamAvatars,
    AvatarWrapper,
} from './styled/ProjectCard';
import Avatar from '../../global/Avatar';
import ProjectProgressBar from './ProjectProgressBar';

const MAX_DESCRIPTION_LENGTH = 60;

const formatDescription = (description) =>
    description.substring(0, MAX_DESCRIPTION_LENGTH) +
    (description.length > MAX_DESCRIPTION_LENGTH ? '...' : '');

function _ProjectCard({ project }) {
    const { title, description, members, tasks } = project;
    return (
        <ProjectCard>
            <ProjectInfoWrapper>
                <ProjectName>{title}</ProjectName>
                <ProjectDescription>
                    {formatDescription(description)}
                </ProjectDescription>
                <ProjectTeam>
                    <ProjectTeamTitle>Team:</ProjectTeamTitle>
                    <ProjectTeamAvatars>
                        {members.map(({ avatarUrl, username }, index) => (
                            <AvatarWrapper key={index}>
                                <Avatar src={avatarUrl} title={username} />
                            </AvatarWrapper>
                        ))}
                    </ProjectTeamAvatars>
                </ProjectTeam>
            </ProjectInfoWrapper>
            <ProjectProgressBar tasks={tasks} />
        </ProjectCard>
    );
}

export default _ProjectCard;
