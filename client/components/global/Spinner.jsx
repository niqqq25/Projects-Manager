import React from 'react';
import { Spinner, SpinnerWrapper } from './styles/Spinner';

const _Spinner = ({ size }) => (
    <SpinnerWrapper>
        <Spinner size={size} />
    </SpinnerWrapper>
);

export default _Spinner;
