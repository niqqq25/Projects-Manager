import React from 'react';
import {
    ProjectCreateModal,
    Form,
    FormTitle,
    submitButton,
} from './styles/ProjectCreateModal';
import { SubmitButton } from '../../global/buttons';
import { Input, InputGroup, Textarea } from '../../global/formElements';
import Modal from '../../global/Modal';
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
                    <FormTitle>Create a project</FormTitle>
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
                        value="Create project"
                        isLoading={isLoading}
                    />
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
