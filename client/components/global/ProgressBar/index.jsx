import React from 'react';
import { ProgressBar, ProgressBarInner } from './style';

const _ProgressBar = ({ percentage, _css }) => (
    <ProgressBar css={_css}>
        <ProgressBarInner percentage={percentage} />
    </ProgressBar>
);

export default _ProgressBar;
