import React from 'react';
import Styled from './MainContent.styles';

import TasksTable from '../TasksTable';
import ProjectUsers from '../ProjectUsers';

export default function MainContent({ project, getProject, history }) {
    return (
        <Styled.MainContent>
            <Styled.MainContent__ProjectUsersContainer>
                <ProjectUsers
                    project={project}
                    onRefetch={getProject}
                    history={history}
                />
            </Styled.MainContent__ProjectUsersContainer>
            <Styled.MainContent__TasksTableContainer>
                <TasksTable
                    tasks={project.tasks}
                    projectId={project._id}
                    onRefetch={getProject}
                    history={history}
                />
            </Styled.MainContent__TasksTableContainer>
        </Styled.MainContent>
    );
}
