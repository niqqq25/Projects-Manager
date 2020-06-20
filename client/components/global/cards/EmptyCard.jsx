import React from 'react';
import { EmptyCard } from './styles/EmptyCard';

const _EmptyCard = ({ children, _css }) => (
    <EmptyCard css={_css}>{children}</EmptyCard>
);

export default _EmptyCard;
