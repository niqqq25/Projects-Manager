import styled from 'styled-components';
import { button, disabledButton } from './button';

const CancelButton = styled.a`
    ${button}
    border-radius: 4px;
    padding: 10px 15px;
    color: ${({ theme }) => theme.text.light};
    border: 2px solid ${({ theme }) => theme.text.light};
    &:hover {
        background-color: ${({ theme }) => theme.bg.hover};
    }
    ${({ disabled }) => disabled && disabledButton}
`;

export { CancelButton };
