import React, { useEffect } from 'react';
import { ProjectsPage } from './styled/ProjectsPage';
import ProjectsContainer from './ProjectsContainer';
import ProjectsPageSubHeader from './ProjectsPageSubHeader';

import { useDispatch } from 'react-redux';
import { setProjectsPageActive } from '../../../redux/private/actions/navbar';

function _ProjectsPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setProjectsPageActive());
    }, []);

    return (
        <ProjectsPage>
            <ProjectsPageSubHeader />
            <ProjectsContainer />
        </ProjectsPage>
    );
}

export default _ProjectsPage;
