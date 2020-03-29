import React, { useEffect, useContext } from 'react';
import SignupForm from './SignupForm';
import { AlertMessageContext } from '../../../providers/AlertMessage';

function Signup({ history }) {
    const { setAlertMessage } = useContext(AlertMessageContext);

    useEffect(() => {
        setAlertMessage(null);
    }, []);

    return <SignupForm history={history} />;
}

export default Signup;
