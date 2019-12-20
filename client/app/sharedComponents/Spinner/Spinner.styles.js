import styled, { keyframes, css } from 'styled-components';

const spinning = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

const Spinner = styled.div`
    display: block;
    height: 100%;
    border: 3px solid #ffd6bd;
    border-top-color: white;
    border-radius: 50%;
    animation: ${css`
            ${spinning}`} linear infinite 1s;
`;

export default { Spinner };
