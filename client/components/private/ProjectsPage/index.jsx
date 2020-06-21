import React, { useEffect } from 'react';
import { ProjectsPage } from './styles/ProjectsPage';
import ProjectsList from './ProjectsList';
import ProjectsPageHeader from './ProjectsPageHeader';

import { useDispatch } from 'react-redux';
import {
    setProjectsPageActive,
    removeActive,
} from '../../../redux/private/actions/navbar';

function _ProjectsPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setProjectsPageActive());
        return () => dispatch(removeActive());
    }, []);

    return (
        <ProjectsPage>
            <ProjectsPageHeader />
            <ProjectsList />
        </ProjectsPage>
    );
}

export default _ProjectsPage;
