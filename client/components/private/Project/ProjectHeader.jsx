import React from 'react';
import {
    ProjectHeader,
    ProjectTitle,
    ProjectDescriber,
    ButtonWrapper,
} from './styles/ProjectHeader';
import { Button } from '../../global';

import { connect } from 'react-redux';
import projectEditModalActions from '../../../redux/private/actions/projectEditModal';

function _ProjectHeader({ project, userId, openProjectEditModal }) {
    const { title, owner } = project;

    const isOwner = owner._id === userId;

    return (
        <ProjectHeader>
            <ProjectTitle>
                {title}
                <ProjectDescriber>(Project)</ProjectDescriber>
            </ProjectTitle>
            {isOwner && (
                <ButtonWrapper>
                    <Button value="Edit" onClick={openProjectEditModal} />
                </ButtonWrapper>
            )}
        </ProjectHeader>
    );
}

const ConnectedProjectHeader = connect(
    ({ currentUser }) => ({
        userId: currentUser._id,
    }),
    dispatch => ({
        openProjectEditModal: () => dispatch(projectEditModalActions.open()),
    })
)(_ProjectHeader);

export default ConnectedProjectHeader;
