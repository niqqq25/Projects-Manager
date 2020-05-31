import React from 'react';
import { Input } from './styled/Input';

const _Input = ({ onChange, ...props }) => {
    function handleChange(event) {
        const { name, value } = event.target;
        onChange({ name, value });
    }

    return <Input {...props} onChange={handleChange} />;
};

export default _Input;
