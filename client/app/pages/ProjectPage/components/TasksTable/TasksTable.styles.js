import styled from 'styled-components';

const TasksTable = styled.div``;

const TasksTable__Header = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const TasksTable__Header__Title = styled.h2`
    display: inline-block;
`;

const TableContainer = styled.div`
    overflow: auto;
`;

const TasksTable__Header__ButtonContainer = styled.div`
    width: 100px;
`;

export default {
    TasksTable,
    TableContainer,
    TasksTable__Header,
    TasksTable__Header__Title,
    TasksTable__Header__ButtonContainer,
};
