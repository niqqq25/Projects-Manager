import React, { useState } from 'react';
import './textarea.css';
import '../FormInput/formInput.css';

import TextareaAutosize from 'react-textarea-autosize';

export default function Textarea(props) {
    const { name = '', label, onChange = () => {}, value } = props;

    const [textarea, setTextarea] = useState(value || '');

    function handleTextareaChange(event) {
        setTextarea(event.target.value);
        onChange(event);
    }

    function disableInputBorderSliding() {
        if (textarea.length) {
            return ' disable-input-border-sliding';
        }
        return '';
    }

    function disableLabelSliding() {
        if (textarea.length) {
            return ' disable-label-sliding';
        }
        return '';
    }

    return (
        <div className="input-group">
            <div className={'input-wrapper' + disableInputBorderSliding()}>
                <TextareaAutosize
                    id={name}
                    defaultValue={textarea}
                    onChange={handleTextareaChange}
                    className="input textarea"
                    spellCheck={false}
                />
            </div>
            <label
                htmlFor={name}
                className={'input-label' + disableLabelSliding()}
            >
                {label || name}
            </label>
        </div>
    );
}
