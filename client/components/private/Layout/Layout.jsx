import React, { useEffect } from 'react';
import { GlobalStyle } from './styles/Layout';
import Navbar from './Navbar';
import { Spinner, Notifications, ConfirmationModal } from '../../global';
import Modals from '../Modals';

import { connect } from 'react-redux';
import {
    getCurrentUser,
    logoutCurrentUser,
} from '../../../redux/private/actions/currentUser';
import CURRENT_USER from '../../../redux/private/constants/currentUser';

function Layout(props) {
    const {
        children,
        getCurrentUser,
        currentUser,
        logoutUser,
        isCurrentUserFetching,
    } = props;

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <>
            {!isCurrentUserFetching && currentUser ? (
                <>
                    <Navbar
                        fullName={currentUser.fullName}
                        logoutUser={logoutUser}
                    />
                    {children}
                    <GlobalStyle />
                    <Notifications />
                    <ConfirmationModal />
                    <Modals />
                </>
            ) : (
                <Spinner />
            )}
        </>
    );
}

const ConnectedLayout = connect(
    ({ currentUser, requests }) => ({
        isCurrentUserFetching: requests.includes(CURRENT_USER.GET),
        currentUser,
    }),
    (dispatch) => ({
        getCurrentUser: () => dispatch(getCurrentUser()),
        logoutUser: () => dispatch(logoutCurrentUser()),
    })
)(Layout);

export default ConnectedLayout;
