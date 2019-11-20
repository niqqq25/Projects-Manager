import React from 'react';
import './alertMessage.css';

const noop = () => {};

export default function AlertMessage(props) {
    return (
        <div id="alert-message-wrapper">
            <div
                id="alert-message"
                className={props.fail ? 'alert-fail' : 'alert-success'}
            >
                <p id="alert-message-text">{props.children || ''}</p>
                <a
                    type="button"
                    id="alert-message-close"
                    onClick={props.onClose || noop}
                >
                    &times;
                </a>
            </div>
        </div>
    );
}
