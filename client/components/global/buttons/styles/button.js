import { css, keyframes } from 'styled-components';

const button = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
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
    background-image: ${({ theme }) => theme.bg.doubleHorizontalGradient};
    color: ${({ theme }) => theme.color.white};
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

const linearBackgroundBorder = css`
    content: '';
    z-index: -1;
    border-radius: inherit;
    padding: 2px;
    position: absolute;
    background: ${({ theme }) => theme.bg.horizontalGradient};
    height: 100%;
    width: 100%;
`;

const greyRoundButton = css`
    ${button}
    background: ${({ theme }) => theme.color.lightGrey};
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    transition: 0.2s background linear;
    &:hover {
        background: hsl(0, 0%, 75%);
    }
`;

export {
    button,
    buttonShadow,
    disabledButton,
    linearBackgroundWithTransition,
    linearBackgroundAnimation,
    linearBackgroundBorder,
    greyRoundButton,
};
