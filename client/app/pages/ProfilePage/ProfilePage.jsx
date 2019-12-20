import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';

import Header from '../../sharedComponents/Header';
import ProfileEditForm from './components/ProfileEditForm';

import { AlertMessageContext } from '../../providers/AlertMessageProvider';

const StyledProfilePage = styled.div``;

export default function ProfilePage(props) {
    const { removeAlertMessage } = useContext(AlertMessageContext);

    useEffect(() => {
        removeAlertMessage();
    }, []);

    return (
        <StyledProfilePage>
            <Header />
            <ProfileEditForm history={props.history} />
        </StyledProfilePage>
    );
}
