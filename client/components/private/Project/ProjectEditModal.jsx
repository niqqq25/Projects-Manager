import React from 'react';
import {
    ProjectEditModal,
    Form,
    FormTitle,
    SubmitButtonContainer,
} from './styles/ProjectEditModal';
import {
    SubmitButton,
    InputField,
    Modal,
    Select,
    InputGroup,
    Textarea,
} from '../../global';
import useForm from '../../../helpers/useForm';
import { projectEditModalValidationSchema } from '../../../helpers/validationSchemas';

import { connect } from 'react-redux';
import projectEditModalActions from '../../../redux/private/actions/projectEditModal';
import projectActions, {
    UPDATE_PROJECT,
} from '../../../redux/private/actions/project';

function _ProjectEditModal({
    isOpen,
    onClose,
    updateProject,
    isLoading,
    projectId,
}) {
    const [inputs, { setValue, validateInputs }] = useForm(
        { title: '', description: '' },
        projectEditModalValidationSchema
    );
    const { title, description } = inputs;

    async function handleFormSubmit(e) {
        e.preventDefault();

        const isValid = await validateInputs();
        if (isValid) {
            updateProject(title.value, description.value, null, projectId);
        }
    }

    return (
        <>
            {isOpen ? (
                <ProjectEditModal onSubmit={handleFormSubmit}>
                    <Modal onClose={onClose} closingDisabled={isLoading}>
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
                            <InputGroup
                                value={description.value}
                                label="Description"
                            >
                                <Textarea
                                    defaultValue={description.value}
                                    name="description"
                                    onChange={({ target }) => {
                                        const { name, value } = target;
                                        setValue({ name, value });
                                    }}
                                />
                            </InputGroup>
                            <SubmitButtonContainer>
                                <SubmitButton
                                    value="Create task"
                                    loading={isLoading ? 1 : 0}
                                />
                            </SubmitButtonContainer>
                        </Form>
                    </Modal>
                </ProjectEditModal>
            ) : null}
        </>
    );
}

const ConnectedProjectEditModal = connect(
    ({ projectEditModal, requesting }) => ({
        isOpen: projectEditModal.isOpen,
        isLoading: requesting.includes(UPDATE_PROJECT),
    }),
    dispatch => ({
        onClose: () => dispatch(projectEditModalActions.close()),
        updateProject: (title, description, owner, project_id) =>
            dispatch(projectActions.update({ title, description, project_id })),
    })
)(_ProjectEditModal);

export default ConnectedProjectEditModal;
