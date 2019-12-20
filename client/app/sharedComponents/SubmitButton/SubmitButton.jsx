import React from 'react';
import Styled from './SubmitButton.styles';

export default function SubmitButton(props) {
    const { value = '', loading, onClick = () => {}, disabled } = props;

    return (
        <Styled.SubmitButton
            value={value}
            type="submit"
            onClick={onClick}
            disabled={loading || disabled}
            loading={loading}
        />
    );
}
