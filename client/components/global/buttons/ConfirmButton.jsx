import React from 'react';
import { ConfirmButton } from './styles/ConfirmButton';

const _ConfirmButton = ({ children, _css, ...props }) => (
    <ConfirmButton {...props} css={_css}>
        {children}
    </ConfirmButton>
);

export default _ConfirmButton;
