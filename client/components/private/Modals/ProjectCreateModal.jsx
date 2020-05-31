import React from 'react';
import {
    ProjectCreateModal,
    Form,
    FormTitle,
    SubmitButtonWrapper,
} from './styled/ProjectCreateModal';
import { SubmitButton, InputField, Modal } from '../../global';
import useForm from '../../../helpers/useForm';
import { projectCreateModalValidationSchema } from '../../../helpers/validationSchemas';

import { connect } from 'react-redux';
import { closeModal } from '../../../redux/private/actions/activeModals';
import { createProject } from '../../../redux/private/actions/projects';
import { MODALS, PROJECTS } from '../../../redux/private/constants';

function _ProjectCreateModel({ onClose, isLoading, createProject }) {
    const [inputs, { setValue, validateInputs }] = useForm(
        { title: '', description: '' },
        projectCreateModalValidationSchema
    );
    const { title, description } = inputs;

    async function handleFormSubmit(e) {
        e.preventDefault();

        const isValid = await validateInputs();
        if (isValid) {
            createProject(title.value, description.value);
        }
    }

    return (
        <ProjectCreateModal onSubmit={handleFormSubmit}>
            <Modal onClose={onClose} closingDisabled={isLoading}>
                <Form>
                    <FormTitle>Create project</FormTitle>
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
                            value="Create project"
                            loading={isLoading ? 1 : 0}
                        />
                    </SubmitButtonWrapper>
                </Form>
            </Modal>
        </ProjectCreateModal>
    );
}

const ConnectedProjectCreateModal = connect(
    ({ requests }) => ({
        isLoading: requests.includes(PROJECTS.CREATE),
    }),
    (dispatch) => ({
        onClose: () => dispatch(closeModal(MODALS.PROJECT_CREATE)),
        createProject: (title, description) =>
            dispatch(createProject({ title, description })),
    })
)(_ProjectCreateModel);

export default ConnectedProjectCreateModal;
