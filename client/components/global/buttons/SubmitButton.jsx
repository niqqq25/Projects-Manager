import React from 'react';
import { SubmitButton } from './styles/SubmitButton';

const _SubmitButton = ({ value, isLoading, disabled, _css }) => (
    <SubmitButton
        value={value}
        type="submit"
        disabled={isLoading || disabled}
        isLoading={isLoading}
        css={_css}
    />
);

export default _SubmitButton;
