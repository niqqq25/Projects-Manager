import React, { useEffect, useContext } from 'react';
import './homePage.css';

import Projects from '../Projects/Projects';
import Header from '../../../sharedComponents/Header/Header';

import { AlertMessageContext } from '../../../providers/AlertMessageProvider';

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
            message.fail = false;
        } else if(state.projectLeft){
            message.text = PROJECT_LEAVE_SUCCESS_MESSAGE;
            message.fail = false;
        }

        props.history.replace();
        showAlertMessage(message);
    }

    return (
        <div id="home-page">
            <Header />
            <Projects {...props} />
        </div>
    );
}
