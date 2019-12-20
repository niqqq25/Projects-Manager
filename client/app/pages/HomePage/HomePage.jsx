import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';

import Header from '../../sharedComponents/Header';
import ProjectsTable from './components/ProjectsTable';

import { AlertMessageContext } from '../../providers/AlertMessageProvider';
const StyledHomePage = styled.div``;

const PROJECT_DELETE_SUCCESS_MESSAGE = 'Project has been successfully deleted';
const PROJECT_LEAVE_SUCCESS_MESSAGE = 'You successfully left the project';

export default function HomePage(props) {
    const { showAlertMessage, removeAlertMessage } = useContext(
        AlertMessageContext
    );

    useEffect(() => {
        removeAlertMessage();
        handleOtherPagesAlert();
    }, []);

    function handleOtherPagesAlert() {
        const state = props.location.state || {};
        const message = {};

        if (state.projectDeleted) {
            message.text = PROJECT_DELETE_SUCCESS_MESSAGE;
            message.success = true;
        } else if (state.projectLeft) {
            message.text = PROJECT_LEAVE_SUCCESS_MESSAGE;
            message.success = true;
        }

        props.history.replace();
        if (message.text) {
            showAlertMessage(message);
        }
    }

    return (
        <StyledHomePage>
            <Header />
            <ProjectsTable history={props.history} />
        </StyledHomePage>
    );
}
