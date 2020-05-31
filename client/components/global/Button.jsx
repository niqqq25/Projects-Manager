import React from 'react';
import { ButtonWrapper, Button } from './styled/Button';

const _Button = ({ value, disabled, onClick }) => (
    <ButtonWrapper disabled={disabled}>
        <Button disabled={disabled} onClick={onClick}>
            {value}
        </Button>
    </ButtonWrapper>
);

export default _Button;
