import React, { useState, useContext, useEffect } from 'react';
import Styled from './ProjectEditModal.styles';

import Modal from '../../../../sharedComponents/Modal';
import InputGroup from '../../../../sharedComponents/InputGroup';
import Input from '../../../../sharedComponents/Input';
import Textarea from '../../../../sharedComponents/Textarea';
import Select from '../../../../sharedComponents/Select';
import ProjectDeleteField from '../ProjectDeleteField';
import SubmitButton from '../../../../sharedComponents/SubmitButton';

import ProjectAPI from '../../../../requests/project';
import { AlertMessageContext } from '../../../../providers/AlertMessageProvider';

const INVALID_FORM_MESSAGE = 'Required fields cannot be left blank';
const noop = () => {};

export default function ProjectEditModal({
    history,
    onClose,
    project,
    onSuccess,
}) {
    const [title, setTitle] = useState(project.title || '');
    const [description, setDescription] = useState(project.description || '');
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
        <Styled.ProjectEditModal>
            <Modal onClose={onClose}>
                <Styled.ProjectEditModal__Form>
                    <Styled.ProjectEditModal__InputContainer>
                        <InputGroup
                            value={title}
                            error={titleError}
                            label="Title"
                            required
                        >
                            <Input
                                onChange={e =>
                                    handleTitleChange(e.target.value)
                                }
                                value={title}
                            />
                        </InputGroup>
                    </Styled.ProjectEditModal__InputContainer>
                    <Styled.ProjectEditModal__InputContainer>
                        <InputGroup value={description} label="Description">
                            <Textarea
                                onChange={e => setDescription(e.target.value)}
                                value={description}
                            />
                        </InputGroup>
                    </Styled.ProjectEditModal__InputContainer>
                    <Styled.ProjectEditModal__InputContainer>
                        <InputGroup label="New owner" value="true">
                            <Select
                                onChange={e => setOwner(e.target.value)}
                                defaultValue={project.owner._id}
                            >
                                {project.members.map((member, index) => {
                                    const isOwner =
                                        member._id === project.owner._id;
                                    return (
                                        <option
                                            style={{ width: '100%' }}
                                            key={index}
                                            value={member._id}
                                        >
                                            {isOwner ? '' : member.username}
                                        </option>
                                    );
                                })}
                            </Select>
                        </InputGroup>
                    </Styled.ProjectEditModal__InputContainer>
                    <SubmitButton
                        value="edit"
                        onClick={handleProjectEdit}
                        loading={loading ? 1 : 0}
                    />
                    <ProjectDeleteField
                        projectId={project._id}
                        history={history}
                    />
                </Styled.ProjectEditModal__Form>
            </Modal>
        </Styled.ProjectEditModal>
    );
}
