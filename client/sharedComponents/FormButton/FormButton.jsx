import React from 'react';
import './formButton.css';

export default function FormButton(props) {
    const {value = '', loading, onClick, disabled} = props;

    function loadingAnimation() {
        if (loading) {
            return 'loading-animation';
        }
        return '';
    }

    return (
        <input
            id="form-button"
            className={loadingAnimation()}
            type="submit"
            value={value}
            onClick={onClick}
            disabled={loading || disabled}
        ></input>
    );
}
