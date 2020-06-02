import React from 'react';

import {
    UserInfoCard,
    AvatarBorder,
    CardTitle,
    CardText,
} from './styled/UserInfoCard';
import Avatar from '../../global/Avatar';

function _UserInfoCard({ avatarUrl, fullName, projects }) {
    return (
        <UserInfoCard>
            <AvatarBorder>
                <Avatar size={160} src={avatarUrl} />
            </AvatarBorder>
            <CardTitle>{fullName}</CardTitle>
            <CardText>Projects count: {projects.length}</CardText>
        </UserInfoCard>
    );
}

export default _UserInfoCard;
