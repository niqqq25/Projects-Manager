import React, { useState } from 'react';
import './formInput.css';

export default function FormInput(props) {
    const {
        label = '',
        type = 'text',
        error,
        required,
        onChange = () => {},
    } = props;

    const [input, setInput] = useState('');

    function handleInput(event) {
        setInput(event.target.value);
        onChange(event);
    }

    function disableInputBorderSliding() {
        if (input.length) {
            return ' disable-input-border-sliding';
        }
        return '';
    }

    function disableLabelSliding() {
        if (input.length) {
            return ' disable-label-sliding';
        }
        return '';
    }

    function changeLabelColorToError() {
        if (error) {
            return ' error-color';
        }
        return '';
    }

    return (
        <div className="input-group">
            <div className={'input-wrapper' + disableInputBorderSliding()}>
                <input
                    type={type}
                    id={label}
                    value={input}
                    className="input"
                    onChange={handleInput}
                    autoComplete="off"
                ></input>
            </div>
            <label
                htmlFor={label}
                className={
                    'input-label' +
                    disableLabelSliding() +
                    changeLabelColorToError()
                }
            >
                {label}
                {required && <span className="required-symbol"> *</span>}
            </label>
            {error && <p className="error-text">{error}</p>}
        </div>
    );
}
