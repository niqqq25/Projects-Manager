import styled from 'styled-components';
import { button, linearBackgroundBorder } from './button';

const GreyRoundButton = styled.a`
    ${button}
    background: ${({ theme }) => theme.bg.light};
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    transition: 0.2s background linear;
    &:hover {
        background: hsl(0, 0%, 75%);
    }
    &:focus {
        outline: none;
    }
    &:focus:before {
        ${({ borderOnFocus }) => (borderOnFocus ? linearBackgroundBorder : '')}
    }
`;

export { GreyRoundButton };
