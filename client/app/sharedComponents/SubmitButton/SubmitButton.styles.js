import styled, { keyframes, css } from 'styled-components';

const loading = keyframes`
    0% {background-position: left}
    50% {background-position: right}
    100% {background-position: left}
`;

const SubmitButton = styled.input`
    width: 100%;
    padding: 15px 0;
    text-transform: uppercase;
    border-radius: 25px;
    border: none;
    font-weight: bolder;
    font-family: inherit;
    background-image: linear-gradient(
        90deg,
        #f12711 0%,
        #f5af19 50%,
        #f12711 100%
    );
    background-size: 200%;
    background-position: right;
    transition: background-position 0.5s;
    animation: ${props => (props.loading ? css`${loading} 2s infinite` : 'none')}
    &:hover {
        background-position: left;
        cursor: pointer;
        outline: none;
    }
    &:focus {
        outline: none;
    }
`;

export default { SubmitButton };
