import React from 'react';
import { Card } from './styles/Card';

const _Card = ({ children, _css, ...props }) => (
    <Card {...props} css={_css}>
        {children}
    </Card>
);

export default _Card;
