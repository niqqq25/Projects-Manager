import React, { useEffect } from 'react';
import './modal.css';

const noop = () => {};

export default function Modal(props) {
    const { onClose, children, closingEnabled = true } = props;

    useEffect(() => {
        const body = document.getElementsByTagName('body')[0];
        body.style.overflow = 'hidden';
        body.style.height = '100%';

        return () => {
            body.style.overflow = 'auto';
            body.style.height = 'auto';
        }
    }, []);

    return (
        <div id="modal" onClick={closingEnabled ? onClose : noop}>
            <div id="modal-content" onClick={event => event.stopPropagation()}>
                <span
                    id="modal-close"
                    onClick={closingEnabled ? onClose : noop}
                >
                    &times;
                </span>
                {children}
            </div>
        </div>
    );
}
