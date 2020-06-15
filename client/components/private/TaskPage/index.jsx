import React, { useEffect } from 'react';
import { TaskPage, TaskContent } from './styles/TaskPage';
import Spinner from '../../global/Spinner';
import NotFoundPage from '../NotFoundPage';
import TaskPageHeader from './TaskPageHeader';
import TaskInfo from './TaskInfo';
import Tasks from '../Tasks';

import { connect } from 'react-redux';
import {
    getCurrentTask,
    clearCurrentTask,
} from '../../../redux/private/actions/currentTask';
import CURRENT_TASK from '../../../redux/private/constants/currentTask';

function _TaskPage({ isLoading, currentTask, getTask, clearTask, match }) {
    useEffect(() => {
        getTask(match.params.id);

        return clearTask;
    }, [match]);

    const { notFound, task } = currentTask;

    if (notFound) {
        return <NotFoundPage />;
    }
    if (isLoading || !task) {
        return <Spinner />;
    }

    const {
        _id,
        tasks,
        project,
        title,
        description,
        assignee,
        parentTask,
    } = task;

    return (
        <TaskPage>
            <TaskPageHeader parentTask={parentTask} project={project} />
            <TaskContent>
                <TaskInfo
                    title={title}
                    description={description}
                    assignee={assignee}
                />
                <Tasks tasks={tasks} parentTask={_id} projectId={project._id} />
            </TaskContent>
        </TaskPage>
    );
}

const ConnectedTaskPage = connect(
    ({ requests, currentTask }) => ({
        isLoading: requests.includes(CURRENT_TASK.GET),
        currentTask,
    }),
    (dispatch) => ({
        getTask: (id) => dispatch(getCurrentTask(id)),
        clearTask: () => dispatch(clearCurrentTask()),
    })
)(_TaskPage);

export default ConnectedTaskPage;
