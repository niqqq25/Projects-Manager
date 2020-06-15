import styled from 'styled-components';
import { button, buttonShadow, linearBackgroundWithTransition } from './button';

const CreateButton = styled.a`
    ${button}
    ${buttonShadow}
    ${linearBackgroundWithTransition}
`;

export { CreateButton };