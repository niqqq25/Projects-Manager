import React from 'react';
import { Spinner, SpinnerWrapper } from './style';

const _Spinner = ({ size, _css }) => (
    <SpinnerWrapper css={_css}>
        <Spinner size={size} />
    </SpinnerWrapper>
);

export default _Spinner;
