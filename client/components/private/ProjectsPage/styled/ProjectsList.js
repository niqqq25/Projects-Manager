import styled from 'styled-components';

const ProjectsList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    list-style-type: none;
`;

const EmptyCard = styled.li`
    height: 0;
    width: 300px;
    padding-top: 1.25rem;
    margin: 0 1.25rem;
`;

const NoProjects = styled.div`
    height: 150px;
    width 90%;
    margin: auto;
    border-radius: 0.5rem;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.875rem;
    font-weight: bold;
    color: rgba(108, 117, 125, 0.5);
`;

export { ProjectsList, EmptyCard, NoProjects };
