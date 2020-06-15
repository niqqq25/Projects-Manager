import styled from 'styled-components';

const ProgressBar = styled.div`
    background: #a9a7a7;
    width: 100%;
    height: 25px;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
`;

const ProgressBarInner = styled.div`
    display: block;
    height: 100%;
    background: ${({ theme }) => theme.bg.horizontalGradient};
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
    width: ${({ percentage }) => percentage}%;
`;

export { ProgressBar, ProgressBarInner };
