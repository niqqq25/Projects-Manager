import React from 'react';
import {
    TaskCreateModal,
    Form,
    FormTitle,
    SubmitButtonContainer,
} from './styles/TaskCreateModal';
import { SubmitButton, InputField, Modal } from '../../global';
import useForm from '../../../helpers/useForm';
import { taskCreateModalValidationSchema } from '../../../helpers/validationSchemas';

import { connect } from 'react-redux';
import taskCreateModalActions from '../../../redux/private/actions/taskCreateModal';
import projectActions, {
    CREATE_TASK,
} from '../../../redux/private/actions/project';

function _TaskCreateModel({
    onClose,
    isOpen,
    isLoading,
    createTask,
    projectId,
}) {
    const [inputs, { setValue, validateInputs }] = useForm(
        { title: '', description: '' },
        taskCreateModalValidationSchema
    );
    const { title, description } = inputs;

    async function handleFormSubmit(e) {
        e.preventDefault();

        const isValid = await validateInputs();
        if (isValid) {
            createTask(title.value, description.value, projectId);
        }
    }

    return (
        <>
            {isOpen ? (
                <TaskCreateModal onSubmit={handleFormSubmit}>
                    <Modal onClose={onClose} closingDisabled={isLoading}>
                        <Form>
                            <FormTitle>Create task</FormTitle>
                            <InputField
                                value={title.value}
                                label="Title"
                                error={title.error}
                                onChange={setValue}
                                name="title"
                                required
                            />
                            <InputField
                                value={description.value}
                                label="Description"
                                onChange={setValue}
                                name="description"
                            />
                            <SubmitButtonContainer>
                                <SubmitButton
                                    value="Create task"
                                    loading={isLoading ? 1 : 0}
                                />
                            </SubmitButtonContainer>
                        </Form>
                    </Modal>
                </TaskCreateModal>
            ) : null}
        </>
    );
}

const ConnectedTaskCreateModal = connect(
    ({ taskCreateModal, requesting }) => ({
        isOpen: taskCreateModal.isOpen,
        isLoading: requesting.includes(CREATE_TASK),
    }),
    dispatch => ({
        onClose: () => dispatch(taskCreateModalActions.close()),
        createTask: (title, description, project_id) =>
            dispatch(
                projectActions.createTask({ title, description, project_id })
            ),
    })
)(_TaskCreateModel);

export default ConnectedTaskCreateModal;
