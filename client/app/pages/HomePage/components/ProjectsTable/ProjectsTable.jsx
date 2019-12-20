import React, { useState, useEffect, useContext } from 'react';
import Styled from './ProjectsTable.styles';

import Button from '../../../../sharedComponents/Button';
import Table from '../../../../sharedComponents/Table';
import CreateProjectModal from '../CreateProjectModal';

import ProjectAPI from '../../../../requests/project';
import { AlertMessageContext } from '../../../../providers/AlertMessageProvider';

const FETCH_FAIL_MESSAGE = 'Failed to fetch data';
const CREATE_PROJECT_SUCCESS_MESSAGE = 'Project has been successfully created';

export default function ProjectsTable({ history }) {
    const [createProjectModal, setCreateProjectModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState(null);
    const [error, setError] = useState(null);

    const { showAlertMessage, removeAlertMessage } = useContext(
        AlertMessageContext
    );

    useEffect(() => {
        getProjects();
    }, []);

    async function getProjects() {
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
                onClick={() => history.push(`/projects/${project._id}`)}
            >
                <td>{project.title}</td>
                <td>{project.description || '-'}</td>
                <td>{(project.tasks || []).length}</td>
            </tr>
        ));
    }

    return (
        <Styled.ProjectsTable>
            <Styled.ProjectsTable__Header>
                <Styled.ProjectsTable__Header__Title>
                    Projects
                </Styled.ProjectsTable__Header__Title>
                <Styled.ProjectsTable__Header__ButtonContainer>
                    <Button
                        value="Create +"
                        onClick={() => setCreateProjectModal(true)}
                    />
                </Styled.ProjectsTable__Header__ButtonContainer>
            </Styled.ProjectsTable__Header>
            <Styled.TableContainer>
                <Table
                    headers={['Title', 'Description', 'Tasks count']}
                    bodyContent={getProjectsBodyContent()}
                    loading={loading}
                    error={error}
                    styles={{ minWidth: '800px' }}
                />
            </Styled.TableContainer>
            {createProjectModal && (
                <CreateProjectModal
                    onClose={() => setCreateProjectModal(false)}
                    onSuccess={onCreateProjectSuccess}
                />
            )}
        </Styled.ProjectsTable>
    );
}
