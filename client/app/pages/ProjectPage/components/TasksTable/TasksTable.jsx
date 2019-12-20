import React, { useState, useContext } from 'react';
import Styled from './TasksTable.styles';

import Table from '../../../../sharedComponents/Table';
import Button from '../../../../sharedComponents/Button';
import CreateTaskModal from '../CreateTaskModal';

import { AlertMessageContext } from '../../../../providers/AlertMessageProvider';

const CREATE_TASK_SUCCESS_MESSAGE = 'Task has been successfully created';
const noop = () => {};

export default function TasksTable({
    tasks,
    parentTaskId,
    projectId,
    onRefetch = noop,
    history,
}) {
    const [createTaskModal, setCreateTaskModal] = useState(false);

    const { showAlertMessage } = useContext(AlertMessageContext);

    function getTaskStatus(completed) {
        return (
            <span style={{ color: completed ? 'green' : 'blue' }}>
                {completed ? 'Done' : 'In progress'}
            </span>
        );
    }

    function onCreateTaskSuccess() {
        setCreateTaskModal(false);
        showAlertMessage({
            text: CREATE_TASK_SUCCESS_MESSAGE,
            success: true,
        });
        onRefetch();
    }

    function redirectToTask(taskId) {
        history.push(`/projects/${projectId}/tasks/${taskId}`);
    }

    function getTasksBodyContent() {
        return tasks.map((task, index) => (
            <tr key={index} onClick={() => redirectToTask(task._id)}>
                <td>{task.title}</td>
                <td>{task.description || '-'}</td>
                <td>{(task.tasks || []).length}</td>
                <td>{getTaskStatus(task.isCompleted)}</td>
            </tr>
        ));
    }

    return (
        <Styled.TasksTable>
            <Styled.TasksTable__Header>
                <Styled.TasksTable__Header__Title>
                    Tasks
                </Styled.TasksTable__Header__Title>
                <Styled.TasksTable__Header__ButtonContainer>
                    <Button
                        value="Create +"
                        onClick={() => setCreateTaskModal(true)}
                    />
                </Styled.TasksTable__Header__ButtonContainer>
            </Styled.TasksTable__Header>
            <Styled.TableContainer>
                <Table
                    headers={['Title', 'Description', 'Tasks count', 'Status']}
                    bodyContent={getTasksBodyContent()}
                    styles={{ minWidth: '800px' }}
                />
            </Styled.TableContainer>
            {createTaskModal && (
                <CreateTaskModal
                    onClose={() => setCreateTaskModal(false)}
                    onSuccess={onCreateTaskSuccess}
                    parentTask={parentTaskId}
                    project={projectId}
                />
            )}
        </Styled.TasksTable>
    );
}
