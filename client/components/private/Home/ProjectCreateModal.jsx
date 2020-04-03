import React from 'react';
import {
    ProjectCreateModal,
    Form,
    FormTitle,
    SubmitButtonContainer,
} from './styles/ProjectCreateModal';
import { SubmitButton, InputField, Modal } from '../../global';
import useForm from '../../../helpers/useForm';
import { projectCreateModalValidationSchema } from '../../../helpers/validationSchemas';

import { connect } from 'react-redux';
import projectCreateModalActions from '../../../redux/private/actions/projectCreateModal';
import projectsActions, {
    CREATE_PROJECTS,
} from '../../../redux/private/actions/projects';

function _ProjectCreateModel({ onClose, isOpen, isLoading, createProject }) {
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
        <>
            {isOpen ? (
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
                            <SubmitButtonContainer>
                                <SubmitButton
                                    value="Create project"
                                    loading={isLoading ? 1 : 0}
                                />
                            </SubmitButtonContainer>
                        </Form>
                    </Modal>
                </ProjectCreateModal>
            ) : null}
        </>
    );
}

const ConnectedProjectCreateModal = connect(
    ({ projectCreateModal, requesting }) => ({
        isOpen: projectCreateModal.isOpen,
        isLoading: requesting.includes(CREATE_PROJECTS),
    }),
    dispatch => ({
        onClose: () => dispatch(projectCreateModalActions.close()),
        createProject: (title, description) =>
            dispatch(projectsActions.create({ title, description })),
    })
)(_ProjectCreateModel);

export default ConnectedProjectCreateModal;
