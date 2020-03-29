import React from 'react';
import {
    InputGroup,
    InputContainer,
    Label,
    InputRequiredSymbol,
    ErrorText,
} from './styles/InputGroup';

const _InputGroup = ({ value, error, label, required, children }) => (
    <InputGroup>
        <InputContainer borderSliding={!value}>{children}</InputContainer>
        <Label error={error} labelSliding={!value}>
            {label}
            {required && <InputRequiredSymbol>*</InputRequiredSymbol>}
        </Label>
        {error && <ErrorText>{error}</ErrorText>}
    </InputGroup>
);

export default _InputGroup;
