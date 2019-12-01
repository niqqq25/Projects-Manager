import React, { useState, useEffect, useContext } from 'react';
import './projects.css';

import Button from '../../../sharedComponents/Button/Button';
import CreateProjectModal from '../CreateProjectModal/CreateProjectModal';
import Table from '../../../sharedComponents/Table/Table';

import * as ProjectAPI from '../../../requests/project';
import { AlertMessageContext } from '../../../providers/AlertMessageProvider';

const FETCH_FAIL_MESSAGE = 'Failed to fetch data';
const CREATE_PROJECT_SUCCESS_MESSAGE = 'Project has been successfully created';

export default function Projects(props) {
    const [createProjectModal, setCreateProjectModal] = useState(false);
    const [projects, setProjects] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { showAlertMessage, removeAlertMessage } = useContext(
        AlertMessageContext
    );

    useEffect(() => {
        getProjects();
    }, []);

    async function getProjects() {
        if (projects) {
            setProjects(null);
        }

        setLoading(true);
        const response = await ProjectAPI.getAll();
        setLoading(false);

        if (response.error) {
            setError(FETCH_FAIL_MESSAGE);
        } else {
            setProjects(response);
            setError(null);
        }
    }

    function onCreateProjectSuccess() {
        setCreateProjectModal(false);
        showAlertMessage({
            text: CREATE_PROJECT_SUCCESS_MESSAGE,
            fail: false,
        });
        getProjects();
    }

    function getProjectsBodyContent() {
        return (projects || []).map((project, index) => (
            <tr
                key={index}
                onClick={() => props.history.push(`/projects/${project._id}`)}
            >
                <th>{project.title}</th>
                <th>{project.description || '-'}</th>
                <th>{(project.tasks || []).length}</th>
            </tr>
        ));
    }

    return (
        <div id="projects">
            <div id="projects-header">
                <h1 id="projects-title">Projects</h1>
                <Button
                    value="Create +"
                    onClick={() => {
                        setCreateProjectModal(true);
                        removeAlertMessage();
                    }}
                />
            </div>
            <Table
                headers={['Title', 'Description', 'Tasks count']}
                bodyContent={getProjectsBodyContent()}
                loading={loading}
                error={error}
            ></Table>
            {createProjectModal && (
                <CreateProjectModal
                    onClose={() => setCreateProjectModal(false)}
                    onSuccess={onCreateProjectSuccess}
                />
            )}
        </div>
    );
}
