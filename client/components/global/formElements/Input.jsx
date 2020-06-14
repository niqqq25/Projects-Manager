import React from 'react';
import { Input } from './styles/Input';
import InputGroup from './InputGroup';

const _Input = ({
    value,
    label,
    error,
    onChange,
    name,
    required,
    ...props
}) => {
    function handleChange(event) {
        const { name, value } = event.target;
        onChange({ name, value });
    }

    return (
        <InputGroup
            value={value}
            label={label}
            error={error}
            required={required}
        >
            <Input
                value={value}
                name={name}
                onChange={handleChange}
                {...props}
            />
        </InputGroup>
    );
};

export default _Input;
