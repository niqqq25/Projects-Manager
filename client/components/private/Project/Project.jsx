import React, { useEffect } from 'react';
import { Spinner } from '../../global';
import NotFoundPage from '../NotFoundPage';
import ProjectHeader from './ProjectHeader';
import ProjectDescription from './ProjectDescription';
import TasksTable from './TasksTable';

import { connect } from 'react-redux';
import { getCurrentProject } from '../../../redux/private/actions/currentProject';
import CURRENT_PROJECT from '../../../redux/private/constants/currentProject';

import projectActions, {
    GET_PROJECT,
} from '../../../redux/private/actions/project';

function Project({ isFetchingProject, project, getProject, match, history }) {
    useEffect(() => {
        const projectId = match.params.id;
        getProject(projectId);
    }, []);
    const { notFound, project: _project } = project;

    if (notFound) {
        <NotFoundPage history={history} />;
    }

    if (isFetchingProject || !_project) {
        return <Spinner />;
    }

    const { description, tasks } = _project;
    return (
        <>
            <ProjectHeader project={_project} />
            <ProjectDescription description={description} />
            <TasksTable tasks={tasks} />
        </>
    );
}

const ConnectedProject = connect(
    ({ requests, project }) => ({
        isFetchingProject: requests.includes(CURRENT_PROJECT.GET),
        project,
    }),
    (dispatch) => ({
        getProject: (id) => dispatch(getCurrentProject(id)),
    })
)(Project);

export default ConnectedProject;
