import React from 'react';
import { Link } from './styled/Link';

const _Link = ({ children, ...props }) => <Link {...props}>{children}</Link>;

export default _Link;
