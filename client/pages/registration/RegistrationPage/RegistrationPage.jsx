import React, { useContext, useEffect } from 'react';
import './registrationPage.css';

import RegistrationForm from '../RegistrationForm/RegistrationForm';

import { AlertMessageContext } from '../../../providers/AlertMessageProvider';

export default function RegistrationPage(props) {
    const { removeAlertMessage } = useContext(AlertMessageContext);

    useEffect(() => {
        removeAlertMessage();
    }, []);

    return (
        <div id="registration-page">
            <RegistrationForm {...props} />
        </div>
    );
}
