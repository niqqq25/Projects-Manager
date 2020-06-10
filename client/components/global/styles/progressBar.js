import { css } from 'styled-components';

const progressBar = css`
    background: #a9a7a7;
    width: 100%;
    height: 25px;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
`;

const progressBarInner = css`
    display: block;
    height: 100%;
    background: linear-gradient(90deg, #f5af19, #f12711);
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
`;

export { progressBar, progressBarInner };
