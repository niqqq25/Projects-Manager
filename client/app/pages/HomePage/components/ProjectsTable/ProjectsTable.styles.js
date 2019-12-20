import styled from 'styled-components';

const ProjectsTable = styled.div`
    padding: 20px;
`;

const ProjectsTable__Header = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const ProjectsTable__Header__Title = styled.h2`
    display: inline-block;
`;

const TableContainer = styled.div`
    overflow: auto;
`;

const ProjectsTable__Header__ButtonContainer = styled.div`
    width: 100px;
`;

export default {
    ProjectsTable,
    TableContainer,
    ProjectsTable__Header,
    ProjectsTable__Header__Title,
    ProjectsTable__Header__ButtonContainer,
};
