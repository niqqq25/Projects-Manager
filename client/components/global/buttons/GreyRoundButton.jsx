import React from 'react';
import { GreyRoundButton } from './styles/GreyRoundButton';

const _GreyRoundButton = ({ children, _css, ...props }) => (
    <GreyRoundButton tabIndex="0" {...props} css={_css}>
        {children}
    </GreyRoundButton>
);

export default _GreyRoundButton;
