import React from 'react';
import InputGroup from './InputGroup';
import Input from './Input';

const InputField = ({
    value,
    label,
    error,
    onChange,
    name,
    required,
    ...props
}) => (
    <InputGroup value={value} label={label} error={error} required={required}>
        <Input onChange={onChange} value={value} name={name} {...props} />
    </InputGroup>
);

export default InputField;
