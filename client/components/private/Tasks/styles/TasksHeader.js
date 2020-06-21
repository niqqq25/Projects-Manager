import styled from 'styled-components';

const TasksHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
`;

const Title = styled.h2`
    color: ${({ theme }) => theme.text.primary};
`;

export { TasksHeader, Title };
