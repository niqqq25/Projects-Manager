import React from 'react';
import Styled from './InputGroup.styles';

export default function InputGroup(props) {
    const { value, error, label, required, children } = props;
    return (
        <Styled.InputGroup>
            <Styled.InputGroup__Container borderSliding={!value.length}>
                {children}
            </Styled.InputGroup__Container>
            <Styled.InputGroup__Label
                error={error}
                labelSliding={!value.length}
            >
                {label}
                {required && (
                    <Styled.InputGroup__RequiredSymbol>
                        *
                    </Styled.InputGroup__RequiredSymbol>
                )}
            </Styled.InputGroup__Label>
            {error && (
                <Styled.InputGroup__Error>{error}</Styled.InputGroup__Error>
            )}
        </Styled.InputGroup>
    );
}
