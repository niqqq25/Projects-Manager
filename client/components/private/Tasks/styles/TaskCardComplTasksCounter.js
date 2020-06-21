import styled from 'styled-components';

const ComplTasksCounter = styled.div`
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.text.alt};
`;

const ComplTasksCounterText = styled.p`
    margin-left: 4px;
    white-space: nowrap;
`;

export { ComplTasksCounter, ComplTasksCounterText };
