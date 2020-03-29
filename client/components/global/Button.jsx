import React from 'react';
import { ButtonContainer, Button } from './styles/Button';

const _Button = ({ value, disabled, onClick }) => (
    <ButtonContainer disabled={disabled}>
        <Button disabled={disabled} onClick={onClick}>
            {value}
        </Button>
    </ButtonContainer>
);

export default _Button;
