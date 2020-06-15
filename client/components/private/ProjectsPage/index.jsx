import React, { useEffect } from 'react';
import { ProjectsPage } from './styles/ProjectsPage';
import ProjectsList from './ProjectsList';
import ProjectsPageHeader from './ProjectsPageHeader';

import { useDispatch } from 'react-redux';
import { setProjectsPageActive } from '../../../redux/private/actions/navbar';

function _ProjectsPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setProjectsPageActive());
    }, []);

    return (
        <ProjectsPage>
            <ProjectsPageHeader />
            <ProjectsList />
        </ProjectsPage>
    );
}

export default _ProjectsPage;
