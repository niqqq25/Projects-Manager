import React from 'react';
import { Avatar, AvatarWrapper } from './style';

const _Avatar = ({ size, ...props }) => (
    <AvatarWrapper size={size}>
        <Avatar {...props} />
    </AvatarWrapper>
);

export default _Avatar;
