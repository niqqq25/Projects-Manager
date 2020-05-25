import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import ROUTES from '../../../constants/routes';
import { ProjectsTable, TableContainer } from './styles/ProjectsTable';
import { Table } from '../../global';
import ProjectsTableHeader from './ProjectTableHeader';

import { connect } from 'react-redux';
import { getProjects } from '../../../redux/private/actions/projects';
import PROJECTS from '../../../redux/private/constants/projects';

function _ProjectsTable({ isLoading, projects, getProjects, history }) {
    const projectsCount = projects.length;

    useEffect(() => {
        getProjects(); //fix this mess (need to handle errors)
    }, []);

    return (
        <ProjectsTable>
            <ProjectsTableHeader />
            <TableContainer>
                <Table
                    minWidth="800px"
                    isLoading={isLoading}
                    isEmpty={!projectsCount}
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
                            {projects.map(
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
        ({ projects, requests }) => ({
            isLoading: requests.includes(PROJECTS.GET),
            projects,
        }),
        (dispatch) => ({
            getProjects: () => dispatch(getProjects()),
        })
    )(_ProjectsTable)
);

export default ConnectedProjectsTable;
