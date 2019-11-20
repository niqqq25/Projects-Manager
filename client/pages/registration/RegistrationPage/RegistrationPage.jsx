import React, { useState } from 'react';
import './registrationPage.css';

import RegistrationForm from '../RegistrationForm/RegistrationForm';
import AlertMessage from '../../../sharedComponents/AlertMessage/AlertMessage';

export default function RegistrationPage(props) {
    const [alertMessageText, setAlertMessageText] = useState('');
    const [alertMessageFail, setAlertMessageFail] = useState(false);

    function onRegistrationFail(message) {
        setAlertMessageText(message);
        setAlertMessageFail(true);
    }

    return (
        <div id="registration-page">
            {alertMessageText && (
                <AlertMessage
                    onClose={() => setAlertMessageText('')}
                    isFail={alertMessageFail}
                >
                    {alertMessageText}
                </AlertMessage>
            )}
            <RegistrationForm onRegistrationFail={onRegistrationFail} />
        </div>
    );
}
