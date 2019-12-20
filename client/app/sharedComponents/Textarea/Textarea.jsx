import React from 'react';
import Styled from './Textarea.styles';

export default function Textarea({ onChange, value }) {
    return (
        <Styled.Textarea
            defaultValue={value}
            onChange={onChange}
            spellCheck={false}
        ></Styled.Textarea>
    );
}
