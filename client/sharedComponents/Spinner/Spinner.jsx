import React from 'react';
import './spinner.css';

export default function Spinner({ page, block }) {
    return (
        <div
            className={`spinner ${page ? 'page-spinner' : ''} ${
                block ? 'block-spinner' : ''
            }`}
        ></div>
    );
}
