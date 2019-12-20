import React from 'react';
import Styled from './Button.styles';

export default function Button({ value, disabled, onClick }) {
    return (
        <Styled.ButtonContainer disabled={disabled}>
            <Styled.Button disabled={disabled} onClick={onClick}>
                {value}
            </Styled.Button>
        </Styled.ButtonContainer>
    );
}
