import styled from 'styled-components';
import { button, disabledButton } from './button';

const ConfirmButton = styled.a`
    ${button}
    min-width: 90px;
    color: white;
    background-color: ${({ success, theme }) =>
        success ? theme.success.default : theme.warning.default};
    border-radius: 4px;
    padding: 10px 15px;
    &:hover {
        filter: brightness(90%);
    }
    ${({ disabled }) => disabled && disabledButton}
`;

export { ConfirmButton };
