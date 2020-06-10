import React from 'react';
import { MdPlaylistAddCheck } from 'react-icons/md';
import {
    ComplProjectsCounter,
    ComplProjectCounterText,
} from './styled/ProjectCardComplTasksCounter';

function ProjectCardComplTasksCounter({ tasksCount, completedTasksCount }) {
    return (
        <ComplProjectsCounter>
            <MdPlaylistAddCheck size={24} />
            <ComplProjectCounterText>{`${completedTasksCount} / ${tasksCount}`}</ComplProjectCounterText>
        </ComplProjectsCounter>
    );
}

export default ProjectCardComplTasksCounter;
