import React, { useEffect } from 'react';

import { ProjectPage, ProjectContent } from './styles/ProjectPage';
import Spinner from '../../global/Spinner';
import NotFoundPage from '../NotFoundPage';
import ProjectPageHeader from './ProjectPageHeader';
import ProjectInfo from './ProjectInfo';
import Tasks from '../Tasks';

import { connect } from 'react-redux';
import {
    getCurrentProject,
    clearCurrentProject,
} from '../../../redux/private/actions/currentProject';
import CURRENT_PROJECT from '../../../redux/private/constants/currentProject';

function _ProjectPage({
    isLoading,
    currentProject,
    getProject,
    clearProject,
    match,
}) {
    useEffect(() => {
        getProject(match.params.id);

        return clearProject;
    }, []);

    const { notFound, project } = currentProject;

    if (notFound) {
        return <NotFoundPage />;
    }
    if (isLoading || !project) {
        return <Spinner />;
    }

    const { title, description, members, tasks, _id, owner } = project;
    return (
        <ProjectPage>
            <ProjectPageHeader />
            <ProjectContent>
                <ProjectInfo
                    title={title}
                    description={description}
                    members={members}
                    owner={owner}
                />
                <Tasks tasks={tasks} projectId={_id} />
            </ProjectContent>
        </ProjectPage>
    );
}

const ConnectedProjectPage = connect(
    ({ requests, currentProject }) => ({
        isLoading: requests.includes(CURRENT_PROJECT.GET),
        currentProject,
    }),
    (dispatch) => ({
        getProject: (id) => dispatch(getCurrentProject(id)),
        clearProject: () => dispatch(clearCurrentProject()),
    })
)(_ProjectPage);

export default ConnectedProjectPage;
