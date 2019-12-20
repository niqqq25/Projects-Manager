import React from 'react';
import Styled from './Select.styles';

export default function Select({
    children,
    defaultValue,
    onChange,
    disabled,
}) {
    return (
        <Styled.Select
            defaultValue={defaultValue}
            onChange={onChange}
            disabled={disabled}
        >
            {children}
        </Styled.Select>
    );
}
