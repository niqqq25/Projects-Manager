import React from 'react';
import './select.css';
import '../FormInput/formInput.css';

export default function Select({
    children,
    defaultValue,
    onChange,
    title = '',
    disabled,
}) {
    return (
        <div id="select-wrapper">
            <label htmlFor="select" className="input-label select-label">
                {title}
            </label>
            <select
                id="select"
                className="input"
                defaultValue={defaultValue}
                onChange={onChange}
                disabled={disabled}
            >
                {children}
            </select>
        </div>
    );
}
