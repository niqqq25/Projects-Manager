import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { ProjectsList, FillerCard } from './styles/ProjectsList';
import ProjectCard from './ProjectCard';
import Spinner from '../../global/Spinner';
import { EmptyCard } from '../../global/cards';

import { connect } from 'react-redux';
import { getProjects } from '../../../redux/private/actions/projects';
import PROJECTS from '../../../redux/private/constants/projects';

const EmptyCards = new Array(5)
    .fill(null)
    .map((v, i) => <FillerCard key={i} />);

function _ProjectsList({ isLoading, projects, getProjects }) {
    useEffect(() => {
        getProjects();
    }, []);

    if (isLoading) {
        return <Spinner />;
    }

    if (!projects?.length) {
        return <EmptyCard>You dont participate in any projects</EmptyCard>;
    }

    return (
        <ProjectsList>
            {projects.map((project, index) => (
                <li key={index}>
                    <ProjectCard project={project} />
                </li>
            ))}
            {EmptyCards}
        </ProjectsList>
    );
}

const ConnectedProjectsList = withRouter(
    connect(
        ({ projects, requests }) => ({
            isLoading: requests.includes(PROJECTS.GET),
            projects,
        }),
        (dispatch) => ({
            getProjects: () => dispatch(getProjects()),
        })
    )(_ProjectsList)
);

export default ConnectedProjectsList;
