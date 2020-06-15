import React from 'react';
import { Avatar, AvatarWrapper } from './style';

const _Avatar = ({ size, _css, ...props }) => (
    <AvatarWrapper size={size} css={_css}>
        <Avatar {...props} />
    </AvatarWrapper>
);

export default _Avatar;
