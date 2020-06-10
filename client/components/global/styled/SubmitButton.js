import styled from 'styled-components';
import {
    button,
    linearBackgroundWithTransition,
    linearBackgroundAnimation,
} from '../styles/button';

const SubmitButton = styled.input`
    ${button}
    ${linearBackgroundWithTransition}
    ${({ loading }) => (loading ? linearBackgroundAnimation : '')}
    width: 100%;
    border-radius: 25px;
    text-transform: uppercase;
    border: none;
    font-weight: bolder;
    padding: 15px 0;
    &:hover {outline: none;}
    &:focus {outline: none;}
`;

export { SubmitButton };
