import React, { useState } from 'react';
import './createProjectModal.css';

import Modal from '../../../sharedComponents/Modal/Modal';
import FormInput from '../../../sharedComponents/FormInput/FormInput';
import FormButton from '../../../sharedComponents/FormButton/FormButton';
import AlertMessage from '../../../sharedComponents/AlertMessage/AlertMessage';

import * as ProjectAPI from '../../../requests/project';

const INVALID_FORM_MESSAGE = 'Please fill all required fields';
const noop = () => {};

export default function CreateProjectModal({onClose, onSuccess = noop}) {
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [loading, setLoading] = useState(false);
    const [titleError, setTitleError] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);

    async function handleCreateProjectFormSubmit(event) {
        event.preventDefault();

        if (validateForm()) {
            await setLoading(true);
            const response = await ProjectAPI.create({ title, description });
            setLoading(false);

            if (response.error) {
                setAlertMessage(response.error.message);
            } else {
                onSuccess();
            }
        } else {
            setAlertMessage(INVALID_FORM_MESSAGE);
        }
    }

    function validateForm() {
        return !!title;
    }

    function handleTitleChange(title) {
        if (!title) {
            setTitleError('Please enter a title');
        } else {
            setTitleError(null);
        }
        setTitle(title);
    }

    return (
        <Modal onClose={onClose} closingEnabled={!loading}>
            <form id="create-project-form">
                <FormInput
                    label="Title"
                    onChange={event => handleTitleChange(event.target.value)}
                    error={titleError}
                    required
                />
                <FormInput
                    label="Description"
                    onChange={event => setDescription(event.target.value)}
                />
                <FormButton
                    value="Create project"
                    onClick={handleCreateProjectFormSubmit}
                    loading={loading}
                />
            </form>
            {alertMessage && (
                <AlertMessage onClose={() => setAlertMessage(null)} fail>
                    {alertMessage}
                </AlertMessage>
            )}
        </Modal>
    );
}
