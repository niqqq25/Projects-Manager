import React from 'react';
import {
    TaskCreateModal,
    Form,
    FormTitle,
    submitButton,
} from './styles/TaskCreateModal';
import { SubmitButton } from '../../global/buttons';
import { Input, InputGroup, Textarea } from '../../global/formElements';
import Modal from '../../global/Modal';
import useForm from '../../../helpers/useForm';
import { taskCreateModalValidationSchema } from '../../../helpers/validationSchemas';

import { connect } from 'react-redux';
import { closeModal } from '../../../redux/private/actions/activeModals';
import { createTask as createProjectTask } from '../../../redux/private/actions/currentProject';
import { createTask as createTaskTask } from '../../../redux/private/actions/currentTask';
import {
    MODALS,
    CURRENT_PROJECT,
    CURRENT_TASK,
} from '../../../redux/private/constants';

function _TaskCreateModel({
    onClose,
    isLoading,
    createTaskTask,
    createProjectTask,
    payload,
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
            handleTaskCreate();
        }
    }

    function handleTaskCreate() {
        const { projectId, parentTask } = payload;
        if (parentTask) {
            createTaskTask(
                title.value,
                description.value,
                projectId,
                parentTask
            );
        } else {
            createProjectTask(title.value, description.value, projectId);
        }
    }

    return (
        <TaskCreateModal onSubmit={handleFormSubmit}>
            <Modal onClose={onClose} closingDisabled={isLoading}>
                <Form>
                    <FormTitle>Create task</FormTitle>
                    <Input
                        value={title.value}
                        label="Title"
                        error={title.error}
                        onChange={setValue}
                        name="title"
                        required
                    />
                    <InputGroup value={description.value} label="Description">
                        <Textarea
                            defaultValue={description.value}
                            name="description"
                            onChange={({ target }) => {
                                const { name, value } = target;
                                setValue({ name, value });
                            }}
                        />
                    </InputGroup>
                    <SubmitButton
                        _css={submitButton}
                        value="Create task"
                        isLoading={isLoading}
                    />
                </Form>
            </Modal>
        </TaskCreateModal>
    );
}

const ConnectedTaskCreateModal = connect(
    ({ requests, activeModals }) => ({
        isLoading:
            requests.includes(CURRENT_PROJECT.CREATE_TASK) ||
            requests.includes(CURRENT_TASK.CREATE_TASK),
        payload: activeModals.find(({ type }) => type === MODALS.TASK_CREATE)
            .payload,
    }),
    (dispatch) => ({
        onClose: () => dispatch(closeModal(MODALS.TASK_CREATE)),
        createProjectTask: (title, description, projectId) =>
            dispatch(createProjectTask({ title, description, projectId })),
        createTaskTask: (title, description, projectId, parentTask) =>
            dispatch(
                createTaskTask({ title, description, projectId, parentTask })
            ),
    })
)(_TaskCreateModel);

export default ConnectedTaskCreateModal;
