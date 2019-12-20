import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';

import Header from '../../sharedComponents/Header';
import Spinner from '../../sharedComponents/Spinner';
import MainContent from './components/MainContent';
import TaskEditModal from './components/TaskEditModal';

import TaskAPI from '../../requests/task';
import { AlertMessageContext } from '../../providers/AlertMessageProvider';

const StyledTaskPage = styled.div`
    padding-bottom: 20px;
`;

const StyledTaskPage__SpinnerContainer = styled.div`
    position: absolute;
    width: 50px;
    height: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const TASK_DELETE_SUCCESS_MESSAGE = 'Task has been successfully deleted';
const TASK_EDIT_SUCCESS_MESSAGE = 'The changes have been saved';

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
            showAlertMessage({
                text: TASK_DELETE_SUCCESS_MESSAGE,
                success: true,
            });
            props.history.replace();
        }
    }

    async function onTaskEditSuccess() {
        setTaskEditModal(false);
        await getTask();
        showAlertMessage({ text: TASK_EDIT_SUCCESS_MESSAGE, success: true });
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
        <StyledTaskPage>
            {task ? (
                <>
                    <Header />
                    <MainContent
                        task={task}
                        history={props.history}
                        getTask={getTask}
                        onTaskEdit={() => setTaskEditModal(true)}
                    />
                </>
            ) : (
                <StyledTaskPage__SpinnerContainer>
                    <Spinner />
                </StyledTaskPage__SpinnerContainer>
            )}
            {taskEditModal && (
                <TaskEditModal
                    onClose={() => setTaskEditModal(false)}
                    task={task}
                    history={props.history}
                    onSuccess={onTaskEditSuccess}
                />
            )}
        </StyledTaskPage>
    );
}
