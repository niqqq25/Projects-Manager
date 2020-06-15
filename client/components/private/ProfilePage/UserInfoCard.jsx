import React from 'react';

import {
    AvatarBorder,
    CardTitle,
    CardText,
    userInfoCard,
} from './styles/UserInfoCard';
import Avatar from '../../global/Avatar';
import { Card } from '../../global/cards';

function _UserInfoCard({ avatarUrl, fullName, projects }) {
    return (
        <Card _css={userInfoCard}>
            <AvatarBorder>
                <Avatar size={160} src={avatarUrl} />
            </AvatarBorder>
            <CardTitle>{fullName}</CardTitle>
            <CardText>Projects count: {projects.length}</CardText>
        </Card>
    );
}

export default _UserInfoCard;
