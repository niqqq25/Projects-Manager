import styled from 'styled-components';

const TasksList = styled.ul`
    list-style-type: none;
    padding: 0 1.25rem;
`;

const NoTasks = styled.div`
    height: 150px;
    border-radius: 0.5rem;
    margin: 0 1.25rem;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.875rem;
    font-weight: bold;
    color: rgba(108, 117, 125, 0.5);
`;

export { TasksList, NoTasks };
