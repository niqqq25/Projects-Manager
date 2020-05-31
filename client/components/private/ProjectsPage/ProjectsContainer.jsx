import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { ProjectsContainer, EmptyCard } from './styled/ProjectsContainer';
import ProjectCard from './ProjectCard';
import Spinner from '../../global/Spinner';

import { connect } from 'react-redux';
import { getProjects } from '../../../redux/private/actions/projects';
import PROJECTS from '../../../redux/private/constants/projects';

const EmptyCards = new Array(5).fill(null).map((v, i) => <EmptyCard key={i} />);

function _ProjectsContainer({ isLoading, projects, getProjects }) {
    useEffect(() => {
        getProjects();
    }, []);

    if (isLoading || !projects) {
        return <Spinner />;
    }

    return (
        <ProjectsContainer>
            {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
            ))}
            {EmptyCards}
        </ProjectsContainer>
    );
}

const ConnectedProjectsContainer = withRouter(
    connect(
        ({ projects, requests }) => ({
            isLoading: requests.includes(PROJECTS.GET),
            projects,
        }),
        (dispatch) => ({
            getProjects: () => dispatch(getProjects()),
        })
    )(_ProjectsContainer)
);

export default ConnectedProjectsContainer;
