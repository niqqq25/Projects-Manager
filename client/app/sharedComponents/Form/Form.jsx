import React from 'react';
import Styled from './Form.styles';

export default function Form({ children, title, disableShadow }) {
    return (
        <Styled.Form disableShadow={disableShadow}>
            {title && <Styled.Form__Title>{title}</Styled.Form__Title>}
            {children}
        </Styled.Form>
    );
}
