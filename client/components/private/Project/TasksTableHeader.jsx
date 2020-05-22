import React from 'react';
import {
    TasksTableHeader,
    Title,
    ButtonContainer,
} from './styles/TasksTableHeader';
import { Button } from '../../global';

import { useDispatch } from 'react-redux';
import taskCreateModalActions from '../../../redux/private/actions/taskCreateModal';

function _TasksTableHeader() {
    const dispatch = useDispatch();

    return (
        <TasksTableHeader>
            <Title>Tasks</Title>
            <ButtonContainer>
                <Button
                    value="Create +"
                    onClick={() => dispatch(taskCreateModalActions.open())}
                />
            </ButtonContainer>
        </TasksTableHeader>
    );
}

export default _TasksTableHeader;
