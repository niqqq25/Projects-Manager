import styled from 'styled-components';
import {
    progressBar,
    progressBarInner,
} from '../../../global/styles/progressBar';

const ProgressBar = styled.div`
    ${progressBar}
`;

const ProgressBarInner = styled.div`
    ${progressBarInner}
    width: ${({ percentage }) => percentage}%;
`;

export { ProgressBar, ProgressBarInner };
