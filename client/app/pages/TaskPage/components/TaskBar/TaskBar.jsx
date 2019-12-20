import React from 'react';
import Styled from './TaskBar.styles';

import TaskBreadcrumb from '../TaskBreadcrumb';
import Button from '../../../../sharedComponents/Button';

export default function TaskBar({ onTaskEdit, task, history }) {
    return (
        <Styled.TaskBar>
            <TaskBreadcrumb task={task} history={history} />
            <Styled.TaskBar__MainContent>
                <Styled.MainContent__LeftSide>
                    <Styled.Task__Name>
                        {task.title}
                        <Styled.Task__Type>(Task)</Styled.Task__Type>
                    </Styled.Task__Name>
                    <Styled.Task__Assignee>
                        Assignee:{' '}
                        <Styled.Task__Assignee__Username>
                            {task.assignee ? task.assignee.username : 'None'}
                        </Styled.Task__Assignee__Username>
                    </Styled.Task__Assignee>
                </Styled.MainContent__LeftSide>
                <Styled.MainContent__RightSide>
                    <Button value="Edit" onClick={onTaskEdit} />
                </Styled.MainContent__RightSide>
            </Styled.TaskBar__MainContent>
        </Styled.TaskBar>
    );
}
