import styled from 'styled-components';

const ProjectUsers = styled.div`
    width: 100%;
    text-align: center;
`;

const ProjectUsers__Header = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ProjectUsers__Header__Title = styled.h2`
    display: inline-block;
    text-align: left;
    font-size: 24px;
    margin-bottom: 10px;
`;

const ProjectUsers__Header__ButtonContainer = styled.div``;

const ProjectUsers__UsersList = styled.ul`
    height: 100%;
    overflow: hidden;
`;

export default {
    ProjectUsers,
    ProjectUsers__Header,
    ProjectUsers__Header__ButtonContainer,
    ProjectUsers__Header__Title,
    ProjectUsers__UsersList,
};
