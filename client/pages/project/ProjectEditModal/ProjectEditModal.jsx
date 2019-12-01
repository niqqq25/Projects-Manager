import React, { useState, useContext, useEffect } from 'react';
import './projectEditModal.css';

import Modal from '../../../sharedComponents/Modal/Modal';
import FormInput from '../../../sharedComponents/FormInput/FormInput';
import FormButton from '../../../sharedComponents/FormButton/FormButton';
import Select from '../../../sharedComponents/Select/Select';
import ProjectDeleteField from '../ProjectDeleteField/ProjectDeleteField';
import TextArea from '../../../sharedComponents/Textarea/Textarea';

import * as ProjectAPI from '../../../requests/project';
import { AlertMessageContext } from '../../../providers/AlertMessageProvider';

const INVALID_FORM_MESSAGE = 'Required fields cannot be left blank';
const noop = () => {};

export default function ProjectEditModal({
    history,
    onClose,
    project,
    onSuccess = noop,
}) {
    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.description);
    const [owner, setOwner] = useState(project.owner._id);
    const [titleError, setTitleError] = useState(null);
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

    function validateForm() {
        return title;
    }

    async function handleProjectEdit(event) {
        event.preventDefault();

        if (validateForm()) {
            await setLoading(true);
            const response = await ProjectAPI.update({
                title,
                description,
                owner,
                projectId: project._id,
            });
            setLoading(false);

            if (response.error) {
                onEditFail(response.error);
            } else {
                onEditSuccess();
            }
        } else {
            onEditFail(INVALID_FORM_MESSAGE);
        }
    }

    function onEditSuccess() {
        onSuccess();
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
                    defaultValue={project.owner._id}
                    title="New owner"
                    onChange={event => setOwner(event.target.value)}
                >
                    {project.members.map((member, index) => {
                        const isOwner = member._id === project.owner._id;
                        return (
                            <option key={index} value={member._id}>
                                {isOwner ? '' : member.username}
                            </option>
                        );
                    })}
                </Select>
                <FormButton
                    value="edit"
                    onClick={handleProjectEdit}
                    loading={loading}
                />
                <ProjectDeleteField history={history} projectId={project._id} />
            </form>
        </Modal>
    );
}
