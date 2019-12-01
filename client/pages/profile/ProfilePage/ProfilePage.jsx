import React, { useEffect, useContext } from 'react';
import './profilePage.css';

import ProfileEditForm from '../ProfileEditForm/ProfileEditForm';
import Header from '../../../sharedComponents/Header/Header';

import { AlertMessageContext } from '../../../providers/AlertMessageProvider';

export default function ProfilePage(props) {
    const { removeAlertMessage } = useContext(AlertMessageContext);

    useEffect(() => {
        removeAlertMessage();
    }, []);

    return (
        <div id="profile-page">
            <Header />
            <ProfileEditForm {...props} />
        </div>
    );
}