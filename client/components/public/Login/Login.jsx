import React, { useEffect } from 'react';

import LoginForm from './LoginForm';
import ALERTS from '../../../constants/alerts';

import { useDispatch } from 'react-redux';
import alertActions from '../../../redux/shared/actions/alert';

function Login({ history }) {
    const dispatch = useDispatch();

    useEffect(() => {
        handleSearchParams();
    }, []);

    function handleSearchParams() {
        const searchParams = new URLSearchParams(window.location.search);
        const isUserDelete = searchParams.has('userDelete');

        if (isUserDelete) {
            dispatch(
                alertActions.successWithTimeout(ALERTS.USER.DELETION_SUCCESS)
            );
        }
    }

    return <LoginForm history={history} />;
}

export default Login;
