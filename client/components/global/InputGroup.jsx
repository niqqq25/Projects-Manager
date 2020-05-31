import React from 'react';
import {
    InputGroup,
    InputWrapper,
    Label,
    InputRequiredSymbol,
    ErrorText,
} from './styled/InputGroup';

const _InputGroup = ({ value, error, label, required, children }) => (
    <InputGroup>
        <InputWrapper borderSliding={!value}>{children}</InputWrapper>
        <Label error={error} labelSliding={!value}>
            {label}
            {required && <InputRequiredSymbol>*</InputRequiredSymbol>}
        </Label>
        {error && <ErrorText>{error}</ErrorText>}
    </InputGroup>
);

export default _InputGroup;
