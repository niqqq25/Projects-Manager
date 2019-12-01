import React, { useState } from 'react';
import './formInput.css';

export default function FormInput(props) {
    const {
        name = '',
        label,
        error,
        required,
        onChange = () => {},
        value,
        disabled,
    } = props;

    const [input, setInput] = useState(value || '');

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
                    type={name.toLowerCase() === 'password' ? name : 'text'}
                    id={name}
                    name={name}
                    value={input}
                    className="input"
                    onChange={handleInput}
                    autoComplete="off"
                    disabled={disabled}
                ></input>
            </div>
            <label
                htmlFor={name}
                className={
                    'input-label' +
                    disableLabelSliding() +
                    changeLabelColorToError()
                }
            >
                {label || name}
                {required && <span className="required-symbol"> *</span>}
            </label>
            {error && <p className="error-text">{error}</p>}
        </div>
    );
}
