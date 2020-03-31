import React, { useContext, useEffect } from 'react';
import UserEditForm from './UserEditForm';
import { AlertMessageContext } from '../../../providers/AlertMessage';
import ALERTS from '../../../constants/alerts';

function Profile() {
    const { setAlertMessage } = useContext(AlertMessageContext);

    useEffect(() => {
        setAlertMessage(null);
    });

    function handleUserEditSuccess() {
        setAlertMessage(ALERTS.USER.UPDATE_SUCCESS);
    }

    return <UserEditForm onUserEditSuccess={handleUserEditSuccess} />;
}

export default Profile;
