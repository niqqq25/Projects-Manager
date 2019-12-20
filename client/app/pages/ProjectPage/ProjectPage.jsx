import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';

import Header from '../../sharedComponents/Header';
import Spinner from '../../sharedComponents/Spinner';
import ProjectBar from './components/ProjectBar';
import ProjectEditModal from './components/ProjectEditModal';
import MainContent from './components/MainContent';
import Description from '../../sharedComponents/Description';

import ProjectAPI from '../../requests/project';
import { AlertMessageContext } from '../../providers/AlertMessageProvider';

const PROJECT_EDIT_SUCCESS_MESSAGE = 'The changes have been saved';
const TASK_DELETE_SUCCESS_MESSAGE = 'Task has been successfully deleted';

const StyledProjectPage = styled.div`
    padding-bottom: 20px;
`;

const StyledProjectPage__SpinnerContainer = styled.div`
    position: absolute;
    width: 50px;
    height: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const StyledProjectPage__DescriptionContainer = styled.div`
    padding: 0 10px 5px 10px;
`;

export default function ProjectPage(props) {
    const [project, setProject] = useState(null);
    const [projectEditModal, setProjectEditModal] = useState(false);

    const { showAlertMessage, removeAlertMessage } = useContext(
        AlertMessageContext
    );

    useEffect(() => {
        removeAlertMessage();
        getProject();
        handleOtherPagesAlert();
    }, []);

    function handleOtherPagesAlert() {
        const state = props.location.state || {};

        if (state.taskDeleted) {
            showAlertMessage({
                text: TASK_DELETE_SUCCESS_MESSAGE,
                success: true,
            });
            props.history.replace();
        }
    }

    async function getProject() {
        if (project) {
            setProject(null);
        }
        const response = await ProjectAPI.get(props.match.params.projectId);
        if (response.error) {
            showAlertMessage({ text: response.error, fail: true });
        } else {
            setProject(response);
        }
    }

    async function onProjectEditSuccess() {
        setProjectEditModal(false);
        await getProject();
        showAlertMessage({ text: PROJECT_EDIT_SUCCESS_MESSAGE, success: true });
    }

    return (
        <StyledProjectPage>
            {project ? (
                <>
                    <Header />
                    <ProjectBar
                        onProjectEdit={() => setProjectEditModal(true)}
                        project={project}
                    />
                    {project.description && (
                        <StyledProjectPage__DescriptionContainer>
                            <Description title="Description">
                                {project.description}
                            </Description>
                        </StyledProjectPage__DescriptionContainer>
                    )}
                    <MainContent
                        project={project}
                        getProject={getProject}
                        history={props.history}
                    />
                </>
            ) : (
                <StyledProjectPage__SpinnerContainer>
                    <Spinner />
                </StyledProjectPage__SpinnerContainer>
            )}
            {projectEditModal && (
                <ProjectEditModal
                    history={props.history}
                    onClose={() => setProjectEditModal(false)}
                    project={project}
                    onSuccess={onProjectEditSuccess}
                />
            )}
        </StyledProjectPage>
    );
}
