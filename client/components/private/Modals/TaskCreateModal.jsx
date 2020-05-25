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
import { closeModal } from '../../../redux/private/actions/activeModals';
import { createTask } from '../../../redux/private/actions/currentProject';
import { MODALS, CURRENT_PROJECT } from '../../../redux/private/constants';

function _TaskCreateModel({ onClose, isLoading, createTask, projectId }) {
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
    );
}

const ConnectedTaskCreateModal = connect(
    ({ requests }) => ({
        isLoading: requests.includes(CURRENT_PROJECT.CREATE_TASK),
    }),
    (dispatch) => ({
        onClose: () => dispatch(closeModal(MODALS.TASK_CREATE)),
        createTask: (title, description, project_id) =>
            dispatch(createTask({ title, description, project_id })),
    })
)(_TaskCreateModel);

export default ConnectedTaskCreateModal;
