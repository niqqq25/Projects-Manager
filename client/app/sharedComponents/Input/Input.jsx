import React from 'react';
import Styled from './Input.styles';

export default function Input(props) {
    const { name = '', onChange = () => {}, value, disabled, password } = props;

    return (
        <Styled.Input
            type={password ? 'password' : 'text'}
            name={name}
            value={value}
            onChange={onChange}
            autoComplete="off"
            disabled={disabled}
        />
    );
}
