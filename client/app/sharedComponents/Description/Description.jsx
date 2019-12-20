import React from 'react';
import Styled from './Description.styles';

export default function Description({ children, title }) {
    return (
        <Styled.Description>
            <Styled.Description__Title>{title}</Styled.Description__Title>
            <Styled.Description__Text>{children}</Styled.Description__Text>
        </Styled.Description>
    );
}
