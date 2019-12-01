import React, { useState, useContext } from 'react';
import './tasks.css';

import Table from '../../../sharedComponents/Table/Table';
import Button from '../../../sharedComponents/Button/Button';
import CreateTaskModal from '../CreateTaskModal/CreateTaskModal';

import { AlertMessageContext } from '../../../providers/AlertMessageProvider';

const CREATE_TASK_SUCCESS_MESSAGE = 'Task has been successfully created';
const noop = () => {};

export default function Tasks({
    tasks,
    parentTaskId,
    projectId,
    onRefetch = noop,
    history,
    style,
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
            fail: false,
        });
        onRefetch();
    }

    function redirectToTask(taskId) {
        history.push(`/projects/${projectId}/tasks/${taskId}`);
    }

    function getTasksBodyContent() {
        return tasks.map((task, index) => (
            <tr key={index} onClick={() => redirectToTask(task._id)}>
                <th>{task.title}</th>
                <th>{task.description || '-'}</th>
                <th>{(task.tasks || []).length}</th>
                <th>{getTaskStatus(task.isCompleted)}</th>
            </tr>
        ));
    }

    return (
        <div id="tasks" style={style}>
            <div id="tasks-header">
                <h1 id="tasks-title">Tasks</h1>
                <Button
                    value="Create +"
                    onClick={() => {
                        setCreateTaskModal(true);
                    }}
                />
                {createTaskModal && (
                    <CreateTaskModal
                        onClose={() => setCreateTaskModal(false)}
                        onSuccess={onCreateTaskSuccess}
                        parentTask={parentTaskId}
                        project={projectId}
                    />
                )}
            </div>
            <Table
                headers={['Title', 'Description', 'Tasks count', 'Status']}
                bodyContent={getTasksBodyContent()}
            ></Table>
        </div>
    );
}
