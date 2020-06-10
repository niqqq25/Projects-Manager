import React from 'react';
import {
    TaskCreateModal,
    Form,
    FormTitle,
    SubmitButtonWrapper,
} from './styled/TaskCreateModal';
import { SubmitButton, InputField, Modal } from '../../global';
import useForm from '../../../helpers/useForm';
import { taskCreateModalValidationSchema } from '../../../helpers/validationSchemas';

import { connect } from 'react-redux';
import { closeModal } from '../../../redux/private/actions/activeModals';
import { createTask } from '../../../redux/private/actions/currentProject';
import { MODALS, CURRENT_PROJECT } from '../../../redux/private/constants';

function _TaskCreateModel({ onClose, isLoading, createTask, payload }) {
    const [inputs, { setValue, validateInputs }] = useForm(
        { title: '', description: '' },
        taskCreateModalValidationSchema
    );
    const { title, description } = inputs;

    async function handleFormSubmit(e) {
        e.preventDefault();

        const isValid = await validateInputs();
        if (isValid) {
            handleTaskCreate();
        }
    }

    function handleTaskCreate() {
        const { projectId, parentTaskId } = payload;
        if (projectId) {
            createTask(title.value, description.value, projectId);
        } else {
            //create task with parentTask
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
                    <SubmitButtonWrapper>
                        <SubmitButton
                            value="Create task"
                            loading={isLoading ? 1 : 0}
                        />
                    </SubmitButtonWrapper>
                </Form>
            </Modal>
        </TaskCreateModal>
    );
}

const ConnectedTaskCreateModal = connect(
    ({ requests, activeModals }) => ({
        isLoading: requests.includes(CURRENT_PROJECT.CREATE_TASK),
        payload: activeModals.find(({ type }) => type === MODALS.TASK_CREATE)
            .payload,
    }),
    (dispatch) => ({
        onClose: () => dispatch(closeModal(MODALS.TASK_CREATE)),
        createTask: (title, description, projectId) =>
            dispatch(createTask({ title, description, projectId })),
    })
)(_TaskCreateModel);

export default ConnectedTaskCreateModal;
