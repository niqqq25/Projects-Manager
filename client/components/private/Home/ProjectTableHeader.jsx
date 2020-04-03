import React from 'react';
import {
    ProjectsTableHeader,
    Title,
    ButtonContainer,
} from './styles/ProjectsTableHeader';
import { Button } from '../../global';

import { useDispatch } from 'react-redux';
import projectCreateModalActions from '../../../redux/private/actions/projectCreateModal';

function _ProjectsTableHeader() {
    const dispatch = useDispatch();

    return (
        <ProjectsTableHeader>
            <Title>Projects</Title>
            <ButtonContainer>
                <Button
                    value="Create +"
                    onClick={() => dispatch(projectCreateModalActions.open())}
                />
            </ButtonContainer>
        </ProjectsTableHeader>
    );
}

export default _ProjectsTableHeader;
