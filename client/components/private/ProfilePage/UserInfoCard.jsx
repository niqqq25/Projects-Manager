import React from 'react';

import {
    UserInfoCard,
    AvatarBorder,
    Avatar,
    CardTitle,
    CardText,
} from './styled/UserInfoCard';

function _UserInfoCard({ avatarUrl, fullName, projects }) {
    return (
        <UserInfoCard>
            <AvatarBorder>
                <Avatar size={100} src={avatarUrl} />
            </AvatarBorder>
            <CardTitle>{fullName}</CardTitle>
            <CardText>Projects count: {projects.length}</CardText>
        </UserInfoCard>
    );
}

export default _UserInfoCard;
