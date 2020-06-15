import React from 'react';
import { CreateButton } from './styles/CreateButton';

const _CreateButton = ({ children, _css, ...props }) => (
    <CreateButton {...props} css={_css}>
        {children}
    </CreateButton>
);

export default _CreateButton;
