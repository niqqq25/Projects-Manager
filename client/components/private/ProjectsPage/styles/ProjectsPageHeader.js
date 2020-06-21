import styled from 'styled-components';

const ProjectsPageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    padding: 0 15px;
`;

const Title = styled.h2`
    font-size: 30px;
    color: ${({ theme }) => theme.text.primary};
`;

export { ProjectsPageHeader, Title };
