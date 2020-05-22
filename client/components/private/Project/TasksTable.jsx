import React from 'react';
import { TasksTable, TableContainer, TaskStatus } from './styles/TasksTable';
import { Table } from '../../global';
import TasksTableHeader from './TasksTableHeader';
import ROUTES from '../../../constants/routes';

const getTaskStatus = completed => (
    <TaskStatus completed={completed}>
        {completed ? 'Done' : 'In progress'}
    </TaskStatus>
);

function _TasksTable({ tasks }) {
    const taskCount = (tasks || []).length;

    return (
        <TasksTable>
            <TasksTableHeader />
            <TableContainer>
                <Table minWidth="800px" isEmpty={!taskCount}>
                    <thead>
                        <tr>
                            {[
                                'Title',
                                'Description',
                                'Tasks count',
                                'Status',
                            ].map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    {taskCount ? (
                        <tbody>
                            {tasks.map(
                                (
                                    {
                                        title,
                                        description,
                                        tasks,
                                        isCompleted,
                                        _id,
                                    },
                                    index
                                ) => (
                                    <tr
                                        key={index}
                                        onClick={() =>
                                            history.push(
                                                `${ROUTES.TASK}/${_id}`
                                            )
                                        }
                                    >
                                        <td>{title}</td>
                                        <td>{description || '-'}</td>
                                        <td>{(tasks || []).length}</td>
                                        <td>{getTaskStatus(isCompleted)}</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    ) : null}
                </Table>
            </TableContainer>
        </TasksTable>
    );
}

export default _TasksTable;
