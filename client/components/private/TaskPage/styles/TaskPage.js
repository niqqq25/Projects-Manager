import styled from 'styled-components';

const TaskPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px 20px 20px;
`;

const TaskContent = styled.div`
    width: 800px;
    @media (max-width: 1000px) {
        width: 90%;
    }
`;

export { TaskPage, TaskContent };
