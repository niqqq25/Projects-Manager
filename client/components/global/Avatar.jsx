import React from 'react';
import { Avatar, AvatarWrapper } from './styled/Avatar';

const _Avatar = ({ size, ...props }) => (
    <AvatarWrapper size={size}>
        <Avatar {...props} />
    </AvatarWrapper>
);

export default _Avatar;
