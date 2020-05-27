import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import ROUTES from '../../../constants/routes';
import { TableWrapper } from './styles/ProjectsTable';
import { Table } from '../../global';
import ProjectsTableHeader from './ProjectsTableHeader';

import { connect } from 'react-redux';
import { getProjects } from '../../../redux/private/actions/projects';
import PROJECTS from '../../../redux/private/constants/projects';

function _ProjectsTable({
    isFetchingProjects,
    projects,
    getProjects,
    history,
}) {
    const projectsCount = projects.length;

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <>
            <ProjectsTableHeader />
            <TableWrapper>
                <Table
                    minWidth="800px"
                    isLoading={isFetchingProjects}
                    isEmpty={projectsCount}
                    thead={
                        <tr>
                            {['Title', 'Description', 'Task count'].map(
                                (header, index) => (
                                    <th key={index}>{header}</th>
                                )
                            )}
                        </tr>
                    }
                    tbody={projects.map(
                        ({ title, description, tasks, _id }, index) => (
                            <tr
                                key={index}
                                onClick={() =>
                                    history.push(`${ROUTES.PROJECT}/${_id}`)
                                }
                            >
                                <td>{title}</td>
                                <td>{description || '-'}</td>
                                <td>{(tasks || []).length}</td>
                            </tr>
                        )
                    )}
                ></Table>
            </TableWrapper>
        </>
    );
}

const ConnectedProjectsTable = withRouter(
    connect(
        ({ projects, requests }) => ({
            isFetchingProjects: requests.includes(PROJECTS.GET),
            projects,
        }),
        (dispatch) => ({
            getProjects: () => dispatch(getProjects()),
        })
    )(_ProjectsTable)
);

export default ConnectedProjectsTable;
