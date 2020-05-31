import styled from 'styled-components';

const TooltipContent = styled.div`
    visibility: hidden;
    width: 120px;
    background-color: #555;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
    top: 100%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
    &:after {
        content: ' ';
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent #555 transparent;
    }
`;

const Tooltip = styled.div`
    position: relative;
    display: inline-block;
    border-radius: inherit;
    width: 100%;
    &:hover {
        ${TooltipContent} {
            opacity: 1;
            visibility: visible;
        }
    }
`;

export { Tooltip, TooltipContent };
