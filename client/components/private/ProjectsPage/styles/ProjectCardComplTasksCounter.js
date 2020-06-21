import styled from 'styled-components';

const ComplProjectsCounter = styled.div`
    display: flex;
    float: right;
    align-items: center;
    color: ${({ theme }) => theme.text.alt};
`;

const ComplProjectCounterText = styled.p`
    margin-left: 4px;
    white-space: nowrap;
`;

export { ComplProjectsCounter, ComplProjectCounterText };
