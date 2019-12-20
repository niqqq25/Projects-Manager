import React, { useState, useEffect, useContext } from 'react';
import Styled from './CreateTaskModal.styles';

import Modal from '../../../../sharedComponents/Modal';
import InputGroup from '../../../../sharedComponents/InputGroup';
import Input from '../../../../sharedComponents/Input';
import Textarea from '../../../../sharedComponents/Textarea';
import SubmitButton from '../../../../sharedComponents/SubmitButton';

import TaskAPI from '../../../../requests/task';
import { AlertMessageContext } from '../../../../providers/AlertMessageProvider';

const INVALID_FORM_MESSAGE = 'Please fill all required fields';

export default function CreateTaskModal({
    onClose,
    parentTask,
    project,
    onSuccess,
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

    function onTaskCreateSuccess() {
        onSuccess();
    }

    function onTaskCreateFail(message) {
        showAlertMessage({ text: message, fail: true });
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
                onTaskCreateFail(response.error);
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
        <Styled.CreateTaskModal>
            <Modal onClose={onClose} closingEnabled={!loading}>
                <Styled.CreateTaskModal__Form>
                    <Styled.CreateTaskModal__InputContainer>
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
                    </Styled.CreateTaskModal__InputContainer>
                    <Styled.CreateTaskModal__InputContainer>
                        <InputGroup label="Description" value={description}>
                            <Textarea
                                onChange={e => setDescription(e.target.value)}
                                value={description}
                            />
                        </InputGroup>
                    </Styled.CreateTaskModal__InputContainer>
                    <SubmitButton
                        value="Create task"
                        onClick={handleTaskCreateFormSubmit}
                        loading={loading ? 1 : 0}
                    />
                </Styled.CreateTaskModal__Form>
            </Modal>
        </Styled.CreateTaskModal>
    );
}
