import React from 'react';
import {
    ProjectsTableHeader,
    Title,
    ButtonWrapper,
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
            <ButtonWrapper>
                <Button
                    value="Create +"
                    onClick={() => dispatch(openModal(MODALS.PROJECT_CREATE))}
                />
            </ButtonWrapper>
        </ProjectsTableHeader>
    );
}

export default _ProjectsTableHeader;
