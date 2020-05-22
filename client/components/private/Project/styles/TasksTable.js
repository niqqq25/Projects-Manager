import styled from 'styled-components';

const TasksTable = styled.div`
    padding: 20px;
`;

const TableContainer = styled.div`
    overflow-x: auto;
    overflow-y: hidden;
`;

const TaskStatus = styled.span`
    color: ${({ completed }) => (completed ? 'green' : 'blue')};
`;

export { TasksTable, TableContainer, TaskStatus };
