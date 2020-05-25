import React from 'react';
import {
    ProjectsTableHeader,
    Title,
    ButtonContainer,
} from './styles/ProjectsTableHeader';
import { Button } from '../../global';

import { useDispatch } from 'react-redux';
import { openModal } from '../../../redux/private/actions/activeModals';
import MODALS from '../../../redux/private/constants/modals';

function _ProjectsTableHeader() {
    const dispatch = useDispatch();

    return (
        <ProjectsTableHeader>
            <Title>Projects</Title>
            <ButtonContainer>
                <Button
                    value="Create +"
                    onClick={() => dispatch(openModal(MODALS.PROJECT_CREATE))}
                />
            </ButtonContainer>
        </ProjectsTableHeader>
    );
}

export default _ProjectsTableHeader;
