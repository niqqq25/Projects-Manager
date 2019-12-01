import React from 'react';
import './spinner.css';

export default function Spinner({ page, block, style }) {
    return (
        <div
            className={`spinner ${page ? 'page-spinner' : ''} ${
                block ? 'block-spinner' : ''
            }`}
            style={style}
        ></div>
    );
}
