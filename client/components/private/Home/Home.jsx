import React from 'react';
import ProjectsTable from './ProjectsTable';
import ProjectCreateModal from './ProjectCreateModal';

function Home() {
    return (
        <>
            <ProjectsTable />
            <ProjectCreateModal />
        </>
    );
}

export default Home;
