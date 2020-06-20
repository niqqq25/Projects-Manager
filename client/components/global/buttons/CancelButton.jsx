import React from 'react';
import { CancelButton } from './styles/CancelButton';

const _CancelButton = ({ children, _css, ...props }) => (
    <CancelButton {...props} css={_css}>
        {children}
    </CancelButton>
);

export default _CancelButton;
