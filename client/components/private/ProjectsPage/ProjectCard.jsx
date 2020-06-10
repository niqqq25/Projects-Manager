import React from 'react';
import { withRouter } from 'react-router-dom';
import {
    ProjectCard,
    ProjectCardContent,
    ProjectTitle,
    ProjectDescription,
} from './styled/ProjectCard';
import ProjectCardProgressBar from './ProjectCardProgressBar';
import ProjectCardTeam from './ProjectCardTeam';
import ProjectCardComplTasksCounter from './ProjectCardComplTasksCounter';

import ellipseText from '../../../helpers/ellipseText';

import ROUTES from '../../../constants/routes';
const MAX_DESCRIPTION_LENGTH = 60;

function _ProjectCard({ project, history }) {
    const { title, description, members, tasks = [], _id } = project;
    const tasksCount = tasks.length;
    const completedTasksCount = tasks.reduce(
        (acc, { isCompleted }) => acc + (isCompleted ? 1 : 0),
        0
    );

    return (
        <ProjectCard onClick={() => history.push(`${ROUTES.PROJECT}/${_id}`)}>
            <ProjectCardContent>
                <ProjectTitle>{title}</ProjectTitle>
                <ProjectDescription>
                    {ellipseText(description, MAX_DESCRIPTION_LENGTH)}
                </ProjectDescription>
                <ProjectCardTeam members={members} />
                <ProjectCardComplTasksCounter
                    tasksCount={tasksCount}
                    completedTasksCount={completedTasksCount}
                />
            </ProjectCardContent>
            <ProjectCardProgressBar
                tasksCount={tasksCount}
                completedTasksCount={completedTasksCount}
            />
        </ProjectCard>
    );
}

export default withRouter(_ProjectCard);
