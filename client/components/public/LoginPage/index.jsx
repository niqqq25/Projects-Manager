import React, { useEffect } from 'react';

import LoginForm from './LoginForm';
import NOTIFICATIONS from '../../../constants/NOTIFICATIONS';

import { useDispatch } from 'react-redux';
import { addSuccessNotification } from '../../../redux/shared/actions/notifications';

function Login({ history }) {
    const dispatch = useDispatch();

    useEffect(() => {
        handleSearchParams();
    }, []);

    function handleSearchParams() {
        const searchParams = new URLSearchParams(window.location.search);
        const isUserDelete = searchParams.has('userDelete');

        if (isUserDelete) {
            dispatch(addSuccessNotification(NOTIFICATIONS.USER.DELETE_SUCCESS));
        }
    }

    return <LoginForm history={history} />;
}

export default Login;