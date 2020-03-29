import React from 'react';
import { Select } from './styles/Select';

const _Select = ({ children, ...props }) => (
    <Select {...props}>{children}</Select>
);

export default _Select;
