import React, { useState, useEffect, useContext } from 'react';
import './createTaskModal.css';

import Modal from '../../../sharedComponents/Modal/Modal';
import FormInput from '../../../sharedComponents/FormInput/FormInput';
import FormButton from '../../../sharedComponents/FormButton/FormButton';

import * as TaskAPI from '../../../requests/task';
import { AlertMessageContext } from '../../../providers/AlertMessageProvider';

const INVALID_FORM_MESSAGE = 'Please fill all required fields';
const noop = () => {};

export default function createTaskModal({
    onClose,
    parentTask,
    project,
    onSuccess = noop,
}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [titleError, setTitleError] = useState('');
    const [loading, setLoading] = useState(false);

    const { showAlertMessage, removeAlertMessage } = useContext(
        AlertMessageContext
    );

    useEffect(() => {
        removeAlertMessage();
        return removeAlertMessage;
    }, []);

    function handleTitleChange(title) {
        if (!title) {
            setTitleError('Please enter a title');
        } else {
            setTitleError(null);
        }
        setTitle(title);
    }

    function onTaskCreateSuccess(){
        onSuccess();
    }

    function onTaskCreateFail(message){
        showAlertMessage({text: message, fail: true});
    }

    async function handleTaskCreateFormSubmit(event) {
        event.preventDefault();

        if (validateForm()) {
            await setLoading(true);
            const response = await TaskAPI.create({
                task: {
                    title,
                    description,
                },
                project,
                parentTask,
            });
            setLoading(false);

            if (response.error) {
                onTaskCreateFail(response.error)
            } else {
                onTaskCreateSuccess();
            }
        } else {
            onTaskCreateFail(INVALID_FORM_MESSAGE);
        }
    }

    function validateForm() {
        return !!title;
    }

    return (
        <Modal onClose={onClose} closingEnabled={!loading}>
            <form id="create-task-form">
                <FormInput
                    name="title"
                    onChange={event => handleTitleChange(event.target.value)}
                    error={titleError}
                    required
                />
                <FormInput
                    name="description"
                    onChange={event => setDescription(event.target.value)}
                />
                <FormButton
                    value="Create task"
                    onClick={handleTaskCreateFormSubmit}
                    loading={loading}
                />
            </form>
        </Modal>
    );
}
