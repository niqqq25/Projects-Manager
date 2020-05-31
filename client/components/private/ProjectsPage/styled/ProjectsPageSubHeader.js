import styled from 'styled-components';
import {
    button,
    buttonShadow,
    linearBackgroundWithTransition,
} from '../../../global/styles/button';

const ProjectsPageSubHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    padding: 0 15px;
`;

const Title = styled.h2`
    font-size: 30px;
`;

const ProjectCreateButton = styled.a`
    ${button}
    ${buttonShadow}
    ${linearBackgroundWithTransition}
    padding: 15px;
    color: #fff;
    font-weight: bold;
`;

export { ProjectsPageSubHeader, Title, ProjectCreateButton };
