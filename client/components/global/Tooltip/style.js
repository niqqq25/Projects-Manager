import styled, { css } from 'styled-components';

const bottomTooltip = css`
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    &:after {
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-color: transparent transparent ${({ theme }) => theme.tooltip}
            transparent;
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
        border-color: ${({ theme }) => theme.tooltip} transparent transparent
            transparent;
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
    background-color: ${({ theme }) => theme.tooltip};
    color: ${({ theme }) => theme.text.white};
    text-align: center;
    padding: 8px;
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
