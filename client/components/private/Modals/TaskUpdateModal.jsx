import React from 'react';
import { Form, submitButton, modalOuter } from './styles/TaskUpdateModal';
import { SubmitButton } from '../../global/buttons';
import { Input, InputGroup, Textarea } from '../../global/formElements';
import Modal from '../../global/Modal';
import useForm from '../../../helpers/useForm';
import { taskUpdateModalValidationSchema } from '../../../helpers/validationSchemas';

import { connect } from 'react-redux';
import { closeModal } from '../../../redux/private/actions/activeModals';
import { updateCurrentTask } from '../../../redux/private/actions/currentTask';
import { MODALS, CURRENT_TASK } from '../../../redux/private/constants';

function _TaskUpdateModal({ closeModal, updateTask, isLoading, task }) {
    const [inputs, { setValue, validateInputs }] = useForm(
        { title: task.title, description: task.description },
        taskUpdateModalValidationSchema
    );
    const { title, description } = inputs;

    async function handleFormSubmit(e) {
        e.preventDefault();

        if (
            title.value === task.title &&
            description.value === task.description
        ) {
            return;
        }

        const isValid = await validateInputs();
        if (isValid) {
            handleTaskUpdate();
        }
    }

    async function handleTaskUpdate() {
        const error = await updateTask(task._id, {
            title: title.value,
            description: description.value,
        });

        if (!error) {
            closeModal();
        }
    }

    return (
        <Modal
            onClose={closeModal}
            closingDisabled={isLoading}
            title="Update the task"
            _cssOuter={modalOuter}
        >
            <Form onSubmit={handleFormSubmit}>
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
                    value="Update task"
                    isLoading={isLoading}
                />
            </Form>
        </Modal>
    );
}

const ConnectedTaskUpdateModal = connect(
    ({ requests, currentTask }) => ({
        isLoading: requests.includes(CURRENT_TASK.UPDATE),
        task: currentTask.task,
    }),
    (dispatch) => ({
        closeModal: () => dispatch(closeModal(MODALS.TASK_UPDATE)),
        updateTask: (taskId, updates) =>
            dispatch(updateCurrentTask({ taskId, updates })),
    })
)(_TaskUpdateModal);

export default ConnectedTaskUpdateModal;
