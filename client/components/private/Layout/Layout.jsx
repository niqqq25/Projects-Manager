import React, { useEffect } from 'react';
import { GlobalStyle, SpinnerContainer } from './styles/Layout';
import Navbar from './Navbar';
import { Spinner, AlertMessage, ConfirmationModal } from '../../global';

import { connect } from 'react-redux';
import currentUserActions from '../../../redux/private/actions/currentUser';

function Layout(props) {
    const { children, getCurrentUser, currentUser, logoutUser } = props;

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <>
            {currentUser ? (
                <>
                    <Navbar
                        username={currentUser.username}
                        logoutUser={logoutUser}
                    />
                    {children}
                </>
            ) : (
                <SpinnerContainer>
                    <Spinner />
                </SpinnerContainer>
            )}
            <GlobalStyle />
            <AlertMessage />
            <ConfirmationModal />
        </>
    );
}

const ConnectedLayout = connect(
    ({ currentUser }) => ({
        currentUser,
    }),
    dispatch => ({
        getCurrentUser: () => dispatch(currentUserActions.get()),
        logoutUser: () => dispatch(currentUserActions.logout()),
    })
)(Layout);

export default ConnectedLayout;
