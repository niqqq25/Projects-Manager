import React, { useState, useEffect } from 'react';
import './projects.css';

import Button from '../../../sharedComponents/Button/Button';
import CreateProjectModal from '../CreateProjectModal/CreateProjectModal';
import AlertMessage from '../../../sharedComponents/AlertMessage/AlertMessage';
import Spinner from '../../../sharedComponents/Spinner/Spinner';

import * as ProjectAPI from '../../../requests/project';
const FETCH_FAIL_MESSAGE = 'Failed to fetch data';
const CREATE_PROJECT_SUCCESS_MESSAGE = 'Project has been successfully created';

export default function Projects(props) {
    const [createProjectModal, setCreateProjectModal] = useState(false);
    const [projects, setProjects] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);
    const [projectsError, setProjectsError] = useState(null);

    useEffect(() => {
        // setProjects([
        //         {
        //             title: 'Duck',
        //             tasks: ['1', '2', '3'],
        //             description: 'This one has no description',
        //         },
        //     ]);
        // getProjects();
    }, []);

    async function getProjects() {
        if(projects){
            setProjects(null);
        }
        const response = await ProjectAPI.getAll();

        if (response.error) {
            setProjectsError(FETCH_FAIL_MESSAGE);
        } else {
            setProjects(response);
            setProjectsError(null);
        }
    }

    function onCreateProjectSuccess() {
        setCreateProjectModal(false);
        setAlertMessage(CREATE_PROJECT_SUCCESS_MESSAGE);
        getProjects();
    }

    return (
        <div id="projects">
            <div id="projects-header">
                <h1 id="projects-title">Projects</h1>
                <Button
                    value="Create +"
                    onClick={() => setCreateProjectModal(true)}
                />
                {createProjectModal && (
                    <CreateProjectModal
                        onClose={() => setCreateProjectModal(false)}
                        onSuccess={onCreateProjectSuccess}
                    />
                )}
            </div>
            <table id="projects-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Tasks count</th>
                    </tr>
                </thead>
                <tbody>
                    {projects ? (
                        projects.map((project, index) => (
                            <tr key={index}>
                                <th>{project.title}</th>
                                <th>{project.description || '-'}</th>
                                <th>{(project.tasks || []).length}</th>
                            </tr>
                        ))
                    ) : (
                        <tr></tr>
                    )}
                </tbody>
            </table>
            {!projects && !projectsError && <Spinner block/>}
            {projectsError && (
                <p>
                    <span style={{ color: 'red', fontWeight: 'bold' }}>
                        Error:{' '}
                    </span>
                    {projectsError}
                </p>
            )}
            {alertMessage && (
                <AlertMessage
                    onClose={() => setAlertMessage(null)}
                    fail={false}
                >
                    {alertMessage}
                </AlertMessage>
            )}
        </div>
    );
}
