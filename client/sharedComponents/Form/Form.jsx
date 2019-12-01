import React from 'react';
import './form.css';

export default function Form({ children, title, style }) {
    return (
        <form id="form" style={style}>
            {title && <p id="form-title">{title}</p>}
            {children}
        </form>
    );
}