import React, { useEffect } from 'react';
import { Spinner } from '../../global';
import NotFound from '../NotFound';
import ProjectHeader from './ProjectHeader';
import ProjectDescription from './ProjectDescription';
import TasksTable from './TasksTable';

import { connect } from 'react-redux';
import projectActions, {
    GET_PROJECT,
} from '../../../redux/private/actions/project';

function Project({ isFetchingProject, project, getProject, match, history }) {
    useEffect(() => {
        const projectId = match.params.id;
        getProject(projectId);
    }, []);
    const { notFound, project: _project } = project;

    if (isFetchingProject || (!notFound && !_project)) {
        return <Spinner />;
    }

    const { _id, description, tasks } = _project;
    return (
        <>
            {notFound ? (
                <NotFound history={history} />
            ) : (
                <>
                    <ProjectHeader project={_project} />
                    <ProjectDescription description={description} />
                    <TasksTable tasks={tasks} />
                </>
            )}
        </>
    );
}

const ConnectedProject = connect(
    ({ requesting, project }) => ({
        isFetchingProject: requesting.includes(GET_PROJECT),
        project: project,
    }),
    (dispatch) => ({
        getProject: (id) => dispatch(projectActions.get(id)),
    })
)(Project);

export default ConnectedProject;
