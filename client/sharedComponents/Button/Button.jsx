import React from 'react';
import './button.css';

export default function Button({ value, onClick, style, disabled }) {
    return (
        <div id="button-wrapper" style={style} className={disabled ? 'disabled-button' : ''}>
            <button id="button" onClick={onClick} disabled={disabled}>
                {value}
            </button>
        </div>
    );
}
