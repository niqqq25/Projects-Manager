import React from 'react';
import { Input } from './styles/Input';

const _Input = ({ onChange, ...props }) => {
    function handleChange(event) {
        const { name, value } = event.target;
        onChange({ name, value });
    }

    return <Input {...props} onChange={handleChange} />;
};

export default _Input;
