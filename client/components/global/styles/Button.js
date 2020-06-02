import { css, keyframes } from 'styled-components';

const button = css`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: inherit;
    text-decoration: none;
    user-select: none;
    &:hover {
        cursor: pointer;
    }
`;

const buttonShadow = css`
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
`;

const disabledButton = css`
    opacity: 0.65;
    pointer-events: none;
`;

const linearBackgroundWithTransition = css`
    background-image: linear-gradient(
        90deg,
        #f12711 0%,
        #f5af19 50%,
        #f12711 100%
    );
    background-size: 200%;
    background-position: right;
    transition: background-position 0.5s;
    &:hover {
        background-position: left;
    }
`;

const lbAnimation = keyframes`
    0% {background-position: left}
    50% {background-position: right}
    100% {background-position: left}
`;

const linearBackgroundAnimation = css`
    animation: ${lbAnimation} 2s infinite;
`;

export {
    button,
    buttonShadow,
    disabledButton,
    linearBackgroundWithTransition,
    linearBackgroundAnimation,
};
