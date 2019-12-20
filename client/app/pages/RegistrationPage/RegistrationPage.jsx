import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import RegistrationForm from './components/RegistrationForm';
import { AlertMessageContext } from '../../providers/AlertMessageProvider';

const StyledRegistrationPage = styled.div``;

export default function RegistrationPage(props) {
    const { removeAlertMessage } = useContext(AlertMessageContext);

    useEffect(() => {
        removeAlertMessage();
    }, []);

    return (
        <StyledRegistrationPage>
            <RegistrationForm history={props.history} />
        </StyledRegistrationPage>
    );
}
