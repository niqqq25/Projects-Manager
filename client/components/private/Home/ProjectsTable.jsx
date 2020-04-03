import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import ROUTES from '../../../constants/routes';
import { ProjectsTable, TableContainer } from './styles/ProjectsTable';
import { Table } from '../../global';
import ProjectsTableHeader from './ProjectTableHeader';

import { connect } from 'react-redux';
import projectsActions, {
    GET_PROJECTS,
} from '../../../redux/private/actions/projects';

function _ProjectsTable({ isLoading, projects, getProjects, history }) {
    const { error, projects: _projects } = projects;
    const projectsCount = (_projects || []).length;

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <ProjectsTable>
            <ProjectsTableHeader />
            <TableContainer>
                <Table
                    minWidth="800px"
                    isLoading={isLoading}
                    isEmpty={!projectsCount}
                    isError={error}
                >
                    <thead>
                        <tr>
                            {['Title', 'Description', 'Task count'].map(
                                (header, index) => (
                                    <th key={index}>{header}</th>
                                )
                            )}
                        </tr>
                    </thead>
                    {projectsCount ? (
                        <tbody>
                            {_projects.map(
                                ({ title, description, tasks, _id }, index) => (
                                    <tr
                                        key={index}
                                        onClick={() =>
                                            history.push(
                                                `${ROUTES.PROJECT}/${_id}`
                                            )
                                        }
                                    >
                                        <td>{title}</td>
                                        <td>{description || '-'}</td>
                                        <td>{(tasks || []).length}</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    ) : null}
                </Table>
            </TableContainer>
        </ProjectsTable>
    );
}

const ConnectedProjectsTable = withRouter(
    connect(
        ({ projects, requesting }) => ({
            isLoading: requesting.includes(GET_PROJECTS),
            projects: projects,
        }),
        dispatch => ({
            getProjects: () => dispatch(projectsActions.getAll()),
        })
    )(_ProjectsTable)
);

export default ConnectedProjectsTable;
