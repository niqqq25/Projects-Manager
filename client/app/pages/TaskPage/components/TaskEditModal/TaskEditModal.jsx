import React, { useState, useContext, useEffect } from 'react';
import Styled from './TaskEditModal.styles';

import Modal from '../../../../sharedComponents/Modal';
import InputGroup from '../../../../sharedComponents/InputGroup';
import Input from '../../../../sharedComponents/Input';
import Select from '../../../../sharedComponents/Select';
import SubmitButton from '../../../../sharedComponents/SubmitButton';
import Textarea from '../../../../sharedComponents/Textarea';
import TaskDeleteField from '../TaskDeleteField';

import { AlertMessageContext } from '../../../../providers/AlertMessageProvider';
import UserAPI from '../../../../requests/user';
import TaskAPI from '../../../../requests/task';

const USERS_FETCH_FAIL_MESSAGE = 'Failed to load users.';

export default function TaskEditModal({ onClose, task, history, onSuccess }) {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(task.title || '');
    const [description, setDescription] = useState(task.description || '');
    const [isCompleted, setIsCompleted] = useState(task.isCompleted);
    const [assignee, setAssignee] = useState((task.assignee || {})._id);
    const [titleError, setTitleError] = useState(null);
    const [projectMembers, setProjectMembers] = useState(null);

    const { showAlertMessage, removeAlertMessage } = useContext(
        AlertMessageContext
    );

    useEffect(() => {
        removeAlertMessage();
        getProjectMembers();
        return removeAlertMessage;
    }, []);

    async function getProjectMembers() {
        await setLoading(true);
        const response = await UserAPI.getAll({
            projectId: task.project._id,
            isMember: true,
        });
        setLoading(false);

        if (response.error) {
            showAlertMessage({ text: USERS_FETCH_FAIL_MESSAGE, fail: true });
        } else {
            setProjectMembers(response);
        }
    }

    function handleTitleChange(title) {
        if (!title) {
            setTitleError('Please enter a title');
        } else {
            setTitleError(null);
        }
        setTitle(title);
    }

    function validateForm() {
        return title;
    }

    async function handleTaskEdit(event) {
        event.preventDefault();

        if (validateForm()) {
            await setLoading(true);
            const assigneeResponse = await updateAssignee();
            const taskResponse = await updateTask();
            setLoading(false);

            if (assigneeResponse.error || taskResponse.error) {
                onEditFail(assigneeResponse.error || taskResponse.error);
            } else {
                onEditSuccess();
            }
        } else {
            onEditFail(INVALID_FORM_MESSAGE);
        }
    }

    async function updateAssignee() {
        const prvsAssignee = (task.assignee || {})._id;
        let response = {};

        if (prvsAssignee !== assignee) {
            if (assignee) {
                response = await TaskAPI.addAssignee(task._id, assignee);
            } else {
                response = await TaskAPI.removeAssigne(task._id);
            }
        }

        return response;
    }

    async function updateTask() {
        const isChanged =
            task.isCompleted !== isCompleted ||
            task.title !== title ||
            task.description !== description;
        let response = {};

        if (isChanged) {
            response = await TaskAPI.update(task._id, {
                isCompleted,
                title,
                description,
            });
        }

        return response;
    }

    function onEditSuccess() {
        onSuccess();
    }

    function onEditFail(message) {
        showAlertMessage({ text: message, fail: true });
    }

    return (
        <Styled.TaskEditModal>
            <Modal onClose={onClose} closingEnabled={!loading}>
                <Styled.TaskEditModal__Form>
                    <Styled.TaskEditModal__InputContainer>
                        <InputGroup
                            label="title"
                            value={title}
                            error={titleError}
                            required
                        >
                            <Input
                                value={title}
                                onChange={event =>
                                    handleTitleChange(event.target.value)
                                }
                            />
                        </InputGroup>
                    </Styled.TaskEditModal__InputContainer>
                    <Styled.TaskEditModal__InputContainer>
                        <InputGroup label="description" value={description}>
                            <Textarea
                                value={description}
                                onChange={event =>
                                    setDescription(event.target.value)
                                }
                            />
                        </InputGroup>
                    </Styled.TaskEditModal__InputContainer>
                    <Styled.TaskEditModal__InputContainer>
                        <InputGroup label="Task status" value="1">
                            <Select
                                defaultValue={!!task.isCompleted}
                                onChange={event =>
                                    setIsCompleted(event.target.value)
                                }
                            >
                                <option value={true}>Completed</option>
                                <option value={false}>In progress</option>
                            </Select>
                        </InputGroup>
                    </Styled.TaskEditModal__InputContainer>
                    <Styled.TaskEditModal__InputContainer>
                        <InputGroup label="Assignee" value={assignee || ''}>
                            <Select
                                disabled={!projectMembers}
                                onChange={event =>
                                    setAssignee(event.target.value)
                                }
                                defaultValue={assignee}
                                key={projectMembers ? '1' : '2'}
                            >
                                <option></option>
                                {(projectMembers || []).map(
                                    (projectMember, index) => (
                                        <option
                                            key={index}
                                            value={projectMember._id}
                                        >
                                            {projectMember.username}
                                        </option>
                                    )
                                )}
                            </Select>
                        </InputGroup>
                    </Styled.TaskEditModal__InputContainer>
                    <SubmitButton
                        value="edit"
                        onClick={handleTaskEdit}
                        loading={loading ? 1 : 0}
                    />
                    <TaskDeleteField task={task} history={history} />
                </Styled.TaskEditModal__Form>
            </Modal>
        </Styled.TaskEditModal>
    );
}
