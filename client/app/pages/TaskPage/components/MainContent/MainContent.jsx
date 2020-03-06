import React from 'react';
import Styled from './MainContent.styles';

import TaskBar from '../TaskBar';
import Description from '../../../../sharedComponents/Description';
import TasksTable from '../../../ProjectPage/components/TasksTable';

export default function MainContent({ task, history, getTask, onTaskEdit }) {
    return (
        <Styled.MainContent>
            <TaskBar task={task} history={history} onTaskEdit={onTaskEdit} />
            <Styled.MainContent__DescriptionContainer>
                <Description title="Description">
                    {task.description || ' '}
                </Description>
            </Styled.MainContent__DescriptionContainer>
            <Styled.MainContent__TasksTableContainer>
                <TasksTable
                    parentTaskId={task._id}
                    projectId={task.project._id}
                    tasks={task.tasks}
                    onRefetch={getTask}
                    history={history}
                />
            </Styled.MainContent__TasksTableContainer>
        </Styled.MainContent>
    );
}
