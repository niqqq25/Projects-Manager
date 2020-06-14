import styled, { css } from 'styled-components';

const bottomTooltip = css`
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    &:after {
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-color: transparent transparent #555 transparent;
    }
`;

const topTooltip = css`
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    &:after {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-color: #555 transparent transparent transparent;
    }
`;

const TooltipContent = styled.div`
    ${({ top }) => {
        switch (true) {
            case top:
                return topTooltip;
            default:
                return bottomTooltip;
        }
    }}
    display: none;
    background-color: #555;
    color: #fff;
    text-align: center;
    padding: 0.5rem;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
    transition: opacity 0.3s;
    &:after {
        content: ' ';
        position: absolute;
        border-width: 5px;
        border-style: solid;
    }
`;

const Tooltip = styled.div`
    position: relative;
    display: inline-block;
    border-radius: inherit;
    &:hover {
        ${TooltipContent} {
            display: block;
        }
    }
`;

export { Tooltip, TooltipContent };
