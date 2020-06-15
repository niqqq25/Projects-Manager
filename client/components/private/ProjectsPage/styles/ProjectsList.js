import styled from 'styled-components';

const ProjectsList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    list-style-type: none;
`;

const FillerCard = styled.li`
    height: 0;
    width: 300px;
    padding-top: 20px;
    margin: 0 20px;
`;

export { ProjectsList, FillerCard };
