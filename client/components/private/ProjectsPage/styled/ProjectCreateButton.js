import styled from 'styled-components';
import {
    button,
    buttonShadow,
    linearBackgroundWithTransition,
} from '../../../global/styles/button';

const ProjectCreateButton = styled.a`
    ${button}
    ${buttonShadow}
    ${linearBackgroundWithTransition}
    padding: 0.9375rem;
    font-weight: bold;
`;

export { ProjectCreateButton };
