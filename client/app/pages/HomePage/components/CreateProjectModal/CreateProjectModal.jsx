import React, { useState, useEffect, useContext } from 'react';
import Styled from './CreateProjectModal.styles';

import Modal from '../../../../sharedComponents/Modal';
import InputGroup from '../../../../sharedComponents/InputGroup';
import Input from '../../../../sharedComponents/Input';
import Textarea from '../../../../sharedComponents/Textarea';
import SubmitButton from '../../../../sharedComponents/SubmitButton';

import ProjectAPI from '../../../../requests/project';
import { AlertMessageContext } from '../../../../providers/AlertMessageProvider';

const INVALID_FORM_MESSAGE = 'Please fill all required fields';

export default function CreateProjectModal({ onClose, onSuccess }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [titleError, setTitleError] = useState(null);

    const { showAlertMessage, removeAlertMessage } = useContext(
        AlertMessageContext
    );

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

    useEffect(() => {
        removeAlertMessage();
        return removeAlertMessage;
    }, []);

    return (
        <Styled.CreateProjectModal>
            <Modal onClose={onClose} closingEnabled={!loading}>
                <Styled.CreateProjectModal__Form>
                    <Styled.CreateProjectModal__InputContainer>
                        <InputGroup
                            label="Title"
                            value={title}
                            error={titleError}
                            required
                        >
                            <Input
                                onChange={e =>
                                    handleTitleChange(e.target.value)
                                }
                                value={title}
                            />
                        </InputGroup>
                    </Styled.CreateProjectModal__InputContainer>
                    <Styled.CreateProjectModal__InputContainer>
                        <InputGroup label="Description" value={description}>
                            <Textarea
                                onChange={e => setDescription(e.target.value)}
                                value={description}
                            />
                        </InputGroup>
                    </Styled.CreateProjectModal__InputContainer>
                    <SubmitButton
                        value="Create project"
                        onClick={handleCreateProjectFormSubmit}
                        loading={loading ? 1 : 0}
                    />
                </Styled.CreateProjectModal__Form>
            </Modal>
        </Styled.CreateProjectModal>
    );
}
