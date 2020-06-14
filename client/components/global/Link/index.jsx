import React from 'react';
import { Link } from './style';

const _Link = ({ children, _css, ...props }) => (
    <Link {...props} css={_css} href="#">
        {children}
    </Link>
);

export default _Link;
