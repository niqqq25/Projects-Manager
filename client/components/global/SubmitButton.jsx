import React from 'react';
import { SubmitButton } from './styles/SubmitButton';

const _SubmitButton = ({ value, loading, disabled }) => (
    <SubmitButton
        value={value}
        type="submit"
        disabled={loading || disabled}
        loading={loading}
    />
);

export default _SubmitButton;
