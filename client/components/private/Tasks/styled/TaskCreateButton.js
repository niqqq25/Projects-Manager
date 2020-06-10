import styled from 'styled-components';
import {
    button,
    buttonShadow,
    linearBackgroundWithTransition,
} from '../../../global/styles/button';

const TaskCreateButton = styled.a`
    ${button}
    ${buttonShadow}
    ${linearBackgroundWithTransition}
    padding: 15px;
    font-weight: bold;
`;

export { TaskCreateButton };
