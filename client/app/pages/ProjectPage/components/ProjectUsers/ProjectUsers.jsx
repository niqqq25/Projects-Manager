import React, { useState, useContext } from 'react';
import Styled from './ProjectUsers.styles';

import Button from '../../../../sharedComponents/Button';
import ProjectUser from '../ProjectUser';
import AddUserModal from '../AddUserModal';

import { UserContext } from '../../../../providers/UserProvider';

export default function ProjectUsers({ project = {}, onRefetch, history }) {
    const [addUserModal, setAddUserModal] = useState(false);
    const { user } = useContext(UserContext);
    const isOwner = user._id === project.owner._id;

    function onAddUserSuccess() {
        setAddUserModal(false);
        onRefetch();
    }

    return (
        <Styled.ProjectUsers>
            <Styled.ProjectUsers__Header>
                <Styled.ProjectUsers__Header__Title>
                    Users
                </Styled.ProjectUsers__Header__Title>
                {isOwner && (
                    <Styled.ProjectUsers__Header__ButtonContainer>
                        <Button
                            value="Add +"
                            onClick={() => setAddUserModal(true)}
                        />
                    </Styled.ProjectUsers__Header__ButtonContainer>
                )}
            </Styled.ProjectUsers__Header>
            <Styled.ProjectUsers__UsersList>
                {project.members.map((member, index) => (
                    <ProjectUser
                        history={history}
                        onRefetch={onRefetch}
                        member={member}
                        project={project}
                        key={index}
                    />
                ))}
            </Styled.ProjectUsers__UsersList>
            {addUserModal && (
                <AddUserModal
                    onClose={() => setAddUserModal(false)}
                    projectId={project._id}
                    onSuccess={onAddUserSuccess}
                />
            )}
        </Styled.ProjectUsers>
    );
}
