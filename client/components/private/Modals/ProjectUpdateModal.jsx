import React from 'react';
import {
    ProjectEditModal,
    Form,
    FormTitle,
    SubmitButtonWrapper,
} from './styles/ProjectUpdateModal';
import {
    SubmitButton,
    InputField,
    Modal,
    InputGroup,
    Textarea,
} from '../../global';
import useForm from '../../../helpers/useForm';
import { projectEditModalValidationSchema } from '../../../helpers/validationSchemas';

import { connect } from 'react-redux';
import { closeModal } from '../../../redux/private/actions/activeModals';
import { updateCurrentProject } from '../../../redux/private/actions/currentProject';
import { MODALS, CURRENT_PROJECT } from '../../../redux/private/constants';

function _ProjectEditModal({ onClose, updateProject, isLoading, projectId }) {
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
                            value="Create task"
                            loading={isLoading ? 1 : 0}
                        />
                    </SubmitButtonWrapper>
                </Form>
            </Modal>
        </ProjectEditModal>
    );
}

const ConnectedProjectEditModal = connect(
    ({ requests }) => ({
        isLoading: requests.includes(CURRENT_PROJECT.UPDATE),
    }),
    (dispatch) => ({
        onClose: () => dispatch(closeModal(MODALS.PROJECT_UPDATE)),
        updateProject: (title, description, owner, project_id) =>
            dispatch(updateCurrentProject({ title, description, project_id })),
    })
)(_ProjectEditModal);

export default ConnectedProjectEditModal;
