import React from 'react';
import './alertMessage.css';

const noop = () => {};

export default function AlertMessage({onClose, fail, children, style}) {
    return (
        <div id="alert-message-wrapper" style={style}>
            <div
                id="alert-message"
                className={fail ? 'alert-fail' : 'alert-success'}
            >
                <p id="alert-message-text">{JSON.stringify(children) || ''}</p>
                <a
                    type="button"
                    id="alert-message-close"
                    onClick={onClose || noop}
                >
                    &times;
                </a>
            </div>
        </div>
    );
}
