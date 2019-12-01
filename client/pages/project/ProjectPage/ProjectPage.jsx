import React, { useEffect, useState, useContext } from 'react';
import './projectPage.css';

import Header from '../../../sharedComponents/Header/Header';
import Tasks from '../Tasks/Tasks';
import Spinner from '../../../sharedComponents/Spinner/Spinner';
import ProjectUsers from '../ProjectUsers/ProjectUsers';
import ProjectBar from '../ProjectBar/ProjectBar';
import ProjectEditModal from '../ProjectEditModal/ProjectEditModal';

import * as ProjectAPI from '../../../requests/project';
import { AlertMessageContext } from '../../../providers/AlertMessageProvider';

const PROJECT_EDIT_SUCCESS_MESSAGE = 'The changes have been saved';
const TASK_DELETE_SUCCESS_MESSAGE = 'Task has been successfully deleted';

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
            showAlertMessage({ text: TASK_DELETE_SUCCESS_MESSAGE, fail: false });
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
        showAlertMessage({ text: PROJECT_EDIT_SUCCESS_MESSAGE, fail: false });
    }

    return (
        <div id="project-page">
            {project ? (
                <>
                    <Header />
                    <div style={{ padding: '0 20px' }}>
                        <ProjectBar
                            project={project}
                            onProjectEdit={() => setProjectEditModal(true)}
                        />
                        <div className="main-content">
                            <div className="main-content-left">
                                <ProjectDescription
                                    description={project.description}
                                />
                                <Tasks
                                    tasks={project.tasks}
                                    projectId={project._id}
                                    onRefetch={getProject}
                                    history={props.history}
                                    style={{
                                        padding: '0px',
                                        fontSize: '10px',
                                        width: '100%',
                                    }}
                                />
                            </div>
                            <div className="main-content-right">
                                <ProjectUsers
                                    project={project}
                                    onRefetch={getProject}
                                    history={props.history}
                                />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <Spinner page />
            )}
            {projectEditModal && (
                <ProjectEditModal
                    {...props}
                    onClose={() => setProjectEditModal(false)}
                    project={project}
                    onSuccess={onProjectEditSuccess}
                />
            )}
        </div>
    );
}

const ProjectDescription = ({ description }) =>
    description && (
        <div id="project-description">
            <h2 id="project-description-title">Description</h2>
            <p id="project-description-text">{description}</p>
        </div>
    );
