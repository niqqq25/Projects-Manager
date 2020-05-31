import React from 'react';
import { Spinner, SpinnerWrapper } from './styled/Spinner';

const _Spinner = ({ size }) => (
    <SpinnerWrapper>
        <Spinner size={size} />
    </SpinnerWrapper>
);

export default _Spinner;
