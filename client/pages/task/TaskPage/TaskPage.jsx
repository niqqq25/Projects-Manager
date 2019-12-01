import React, { useEffect, useState, useContext } from 'react';
import './taskPage.css';

import Header from '../../../sharedComponents/Header/Header';
import Spinner from '../../../sharedComponents/Spinner/Spinner';
import Tasks from '../../project/Tasks/Tasks';
import TaskBar from '../TaskBar/TaskBar';
import TaskEditModal from '../TaskEditModal/TaskEditModal';

import * as TaskAPI from '../../../requests/task';
import { AlertMessageContext } from '../../../providers/AlertMessageProvider';

const TASK_DELETE_SUCCESS_MESSAGE = 'Task has been successfully deleted';

export default function TaskPage(props) {
    const { removeAlertMessage, showAlertMessage } = useContext(
        AlertMessageContext
    );
    const [task, setTask] = useState(null);
    const [taskEditModal, setTaskEditModal] = useState(false);

    useEffect(() => {
        removeAlertMessage();
        getTask();
        handleOtherPagesAlert();
    }, [props.match.params.taskId]);

    function handleOtherPagesAlert() {
        const state = props.location.state || {};

        if (state.taskDeleted) {
            showAlertMessage({ text: TASK_DELETE_SUCCESS_MESSAGE, fail: false });
            props.history.replace();
        }
    }

    async function getTask() {
        if (task) {
            setTask(null);
        }

        const response = await TaskAPI.get(props.match.params.taskId);
        if (response.error) {
            showAlertMessage({ text: response.error, fail: true });
        } else {
            setTask(response);
        }
    }

    return (
        <div id="task-page">
            {task ? (
                <>
                    <Header />
                    <div style={{ padding: '0 20px' }}>
                        <TaskBar
                            task={task}
                            history={props.history}
                            onTaskEdit={() => setTaskEditModal(true)}
                        />
                        <TaskDescription description={task.description} />
                        <Tasks
                            parentTaskId={task._id}
                            projectId={task.project._id}
                            tasks={task.tasks}
                            onRefetch={getTask}
                            history={props.history}
                            style={{ width: '100%' }}
                        />
                    </div>
                </>
            ) : (
                <Spinner page />
            )}
            {taskEditModal && (
                <TaskEditModal
                    onClose={() => setTaskEditModal(false)}
                    task={task}
                    history={props.history}
                />
            )}
        </div>
    );
}

const TaskDescription = ({ description }) => (
    <div id="task-description">
        <h2 id="task-description-title">Description</h2>
        <p id="task-description-text">{description || 'None'}</p>
    </div>
);
