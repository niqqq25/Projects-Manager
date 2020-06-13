import React from 'react';
import {
    ProjectUpdateModal,
    Form,
    FormTitle,
    SubmitButtonWrapper,
} from './styled/ProjectUpdateModal';
import {
    SubmitButton,
    InputField,
    Modal,
    InputGroup,
    Textarea,
} from '../../global';
import useForm from '../../../helpers/useForm';
import { ProjectUpdateModalValidationSchema } from '../../../helpers/validationSchemas';

import { connect } from 'react-redux';
import { closeModal } from '../../../redux/private/actions/activeModals';
import { updateCurrentProject } from '../../../redux/private/actions/currentProject';
import {
    addErrorNotification,
    addSuccessNotification,
} from '../../../redux/shared/actions/notifications';
import { MODALS, CURRENT_PROJECT } from '../../../redux/private/constants';
import NOTIFICATIONS from '../../../constants/notifications';

function _ProjectUpdateModal({
    closeModal,
    updateProject,
    isLoading,
    project,
    addErrorNotification,
    addSuccessNotification,
}) {
    const [inputs, { setValue, validateInputs }] = useForm(
        { title: project.title, description: project.description },
        ProjectUpdateModalValidationSchema
    );
    const { title, description } = inputs;

    async function handleFormSubmit(e) {
        e.preventDefault();

        const isValid = await validateInputs();
        if (isValid) {
            handleProjectUpdate();
        }
    }

    async function handleProjectUpdate() {
        const error = await updateProject(
            title.value,
            description.value,
            project._id
        );

        if (error) {
            addErrorNotification(NOTIFICATIONS.PROJECT.UPDATE_ERROR);
        } else {
            addSuccessNotification(NOTIFICATIONS.PROJECT.UPDATE_SUCCESS);
        }
        closeModal();
    }

    return (
        <ProjectUpdateModal onSubmit={handleFormSubmit}>
            <Modal onClose={closeModal} closingDisabled={isLoading}>
                <Form>
                    <FormTitle>Update project</FormTitle>
                    <InputField
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
                    <SubmitButtonWrapper>
                        <SubmitButton
                            value="Update project"
                            loading={isLoading ? 1 : 0}
                        />
                    </SubmitButtonWrapper>
                </Form>
            </Modal>
        </ProjectUpdateModal>
    );
}

const ConnectedProjectUpdateModal = connect(
    ({ requests, currentProject }) => ({
        isLoading: requests.includes(CURRENT_PROJECT.UPDATE),
        project: currentProject.project,
    }),
    (dispatch) => ({
        closeModal: () => dispatch(closeModal(MODALS.PROJECT_UPDATE)),
        updateProject: (title, description, projectId) =>
            dispatch(updateCurrentProject({ title, description, projectId })),
        addErrorNotification: (message) =>
            dispatch(addErrorNotification(message)),
        addSuccessNotification: (message) =>
            dispatch(addSuccessNotification(message)),
    })
)(_ProjectUpdateModal);

export default ConnectedProjectUpdateModal;
