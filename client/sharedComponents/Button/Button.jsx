import React from 'react';
import './button.css';

export default function Button({value, onClick}) {
    return (
        <div id="button-wrapper">
            <button id="button" onClick={onClick}>{value}</button>
        </div>
    );
}
