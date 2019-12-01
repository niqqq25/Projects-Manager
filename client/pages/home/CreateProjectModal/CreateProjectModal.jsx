import React, { useState, useContext, useEffect } from 'react';
import './createProjectModal.css';

import Modal from '../../../sharedComponents/Modal/Modal';
import FormInput from '../../../sharedComponents/FormInput/FormInput';
import FormButton from '../../../sharedComponents/FormButton/FormButton';

import * as ProjectAPI from '../../../requests/project';
import { AlertMessageContext } from '../../../providers/AlertMessageProvider';

const INVALID_FORM_MESSAGE = 'Please fill all required fields';
const noop = () => {};

export default function CreateProjectModal({ onClose, onSuccess = noop }) {
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [loading, setLoading] = useState(false);
    const [titleError, setTitleError] = useState(null);

    const { showAlertMessage, removeAlertMessage } = useContext(AlertMessageContext);

    useEffect(() => {
        return removeAlertMessage;
    }, []);

    async function handleCreateProjectFormSubmit(event) {
        event.preventDefault();

        if (validateForm()) {
            await setLoading(true);
            const response = await ProjectAPI.create({ title, description });
            setLoading(false);

            if (response.error) {
                showAlertMessage({ text: response.error, fail: true });
            } else {
                onSuccess();
            }
        } else {
            showAlertMessage({ text: INVALID_FORM_MESSAGE, fail: true });
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
                    value="Create project"
                    onClick={handleCreateProjectFormSubmit}
                    loading={loading}
                />
            </form>
        </Modal>
    );
}
