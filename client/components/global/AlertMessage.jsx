import React from 'react';
import {
    AlertMessage,
    AlertMessageContainer,
    CloseButton,
    AlertMessageText,
} from './styles/AlertMessage';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import alertActions from '../../redux/shared/actions/alert';

function _AlertMessage() {
    const alert = useSelector(state => state.alert, shallowEqual);
    const dispatch = useDispatch();
    const { message, type } = alert;

    return (
        <>
            {message ? (
                <AlertMessageContainer>
                    <AlertMessage type={type}>
                        <AlertMessageText>{message}</AlertMessageText>
                        <CloseButton
                            type="button"
                            onClick={() => dispatch(alertActions.clear())}
                        >
                            &times;
                        </CloseButton>
                    </AlertMessage>
                </AlertMessageContainer>
            ) : null}
        </>
    );
}

export default _AlertMessage;
