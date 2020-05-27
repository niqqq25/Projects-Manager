import React from 'react';
import {
    TasksTableHeader,
    Title,
    ButtonWrapper,
} from './styles/TasksTableHeader';
import { Button } from '../../global';

import { useDispatch } from 'react-redux';
import taskCreateModalActions from '../../../redux/private/actions/taskCreateModal';

function _TasksTableHeader() {
    const dispatch = useDispatch();

    return (
        <TasksTableHeader>
            <Title>Tasks</Title>
            <ButtonWrapper>
                <Button
                    value="Create +"
                    onClick={() => dispatch(taskCreateModalActions.open())}
                />
            </ButtonWrapper>
        </TasksTableHeader>
    );
}

export default _TasksTableHeader;
