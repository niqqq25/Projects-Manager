import React, { useContext } from 'react';
import Styled from './ProjectBar.styles';

import Button from '../../../../sharedComponents/Button';
import { UserContext } from '../../../../providers/UserProvider';

export default function ProjectBar({project = {}, onProjectEdit}) {
    const { user } = useContext(UserContext);
    const isOwner = project.owner._id === user._id;

    return (
        <Styled.ProjectBar>
            <Styled.ProjectBar__Title>
                {project.title}
                <Styled.ProjectBar__Title__Type>
                    (Project)
                </Styled.ProjectBar__Title__Type>
            </Styled.ProjectBar__Title>
            {isOwner && (
                <Styled.ProjectBar__ButtonContainer>
                    <Button value="Edit" onClick={onProjectEdit} />
                </Styled.ProjectBar__ButtonContainer>
            )}
        </Styled.ProjectBar>
    );
}
