import React, { useState, useEffect } from 'react';
import {
    NotificationWrapper,
    Notification,
    NotificationText,
    CloseButton,
} from './styles/Notification';

import { useDispatch } from 'react-redux';
import {
    prepRemoveNotification,
    removeNotification,
} from '../../redux/shared/actions/notifications';

const noop = () => {};
const REMOVE_TIMEOUT = 4000;
const REMOVE_ANIMATION_TIMEOUT = 450;

function _Notification({ type, message, id, isRemoving }) {
    const dispatch = useDispatch();
    const [timeoutId, setTimeoutId] = useState(null);

    useEffect(() => {
        const tid = setTimeout(
            () => dispatch(prepRemoveNotification(id)),
            REMOVE_TIMEOUT
        );
        setTimeoutId(tid);
    }, []);

    useEffect(() => {
        if (isRemoving) {
            clearTimeout(timeoutId);
            setTimeout(
                () => dispatch(removeNotification(id)),
                REMOVE_ANIMATION_TIMEOUT
            );
        }
    }, [isRemoving]);

    return (
        <NotificationWrapper isRemoving={!!isRemoving}>
            <Notification type={type}>
                <NotificationText>{message}</NotificationText>
                <CloseButton
                    type="button"
                    onClick={
                        isRemoving
                            ? noop
                            : () => dispatch(prepRemoveNotification(id))
                    }
                >
                    &times;
                </CloseButton>
            </Notification>
        </NotificationWrapper>
    );
}

export default _Notification;
