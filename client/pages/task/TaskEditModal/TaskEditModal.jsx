import React, { useState, useContext, useEffect } from 'react';
import './taskEditModal.css';

import Modal from '../../../sharedComponents/Modal/Modal';
import FormInput from '../../../sharedComponents/FormInput/FormInput';
import Select from '../../../sharedComponents/Select/Select';
import FormButton from '../../../sharedComponents/FormButton/FormButton';
import TaskDeleteField from '../TaskDeleteField/TaskDeleteField';
import TextArea from '../../../sharedComponents/Textarea/Textarea';

import { AlertMessageContext } from '../../../providers/AlertMessageProvider';
import * as UserAPI from '../../../requests/user';
import * as TaskAPI from '../../../requests/task';

const USERS_FETCH_FAIL_MESSAGE = 'Failed to load users.';

export default function TaskEditModal({ onClose, task, history }) {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
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
        console.log('zjbs');
    }

    function onEditFail(message) {
        showAlertMessage({ text: message, fail: true });
    }

    return (
        <Modal onClose={onClose} closingEnabled={!loading}>
            <form id="project-edit-form">
                <FormInput
                    value={title}
                    name="title"
                    error={titleError}
                    onChange={event => handleTitleChange(event.target.value)}
                    required
                />
                <TextArea
                    value={description}
                    name="description"
                    onChange={event => setDescription(event.target.value)}
                />
                <Select
                    title="Task status"
                    defaultValue={!!task.isCompleted}
                    onChange={event => setIsCompleted(event.target.value)}
                >
                    <option value={true}>Completed</option>
                    <option value={false}>In progress</option>
                </Select>
                <Select
                    title="Assignee"
                    disabled={!projectMembers}
                    onChange={event => setAssignee(event.target.value)}
                    defaultValue={assignee}
                    key={projectMembers ? '1' : '2'}
                >
                    <option></option>
                    {(projectMembers || []).map((projectMember, index) => (
                        <option key={index} value={projectMember._id}>
                            {projectMember.username}
                        </option>
                    ))}
                </Select>
                <FormButton
                    value="edit"
                    onClick={handleTaskEdit}
                    loading={loading}
                />
                <TaskDeleteField task={task} history={history} />
            </form>
        </Modal>
    );
}
