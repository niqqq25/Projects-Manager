import React from 'react';
import { Notifications } from './styled/Notifications';
import Notification from './Notification';

import { useSelector } from 'react-redux';

const VISABLE_NOTIFICATIONS = 4;

function _Notifications() {
    const notifications = useSelector((state) => state.notifications);

    return (
        <Notifications>
            {notifications
                .slice(0, VISABLE_NOTIFICATIONS)
                .map(({ type, id, message, isRemoving }) => (
                    <Notification
                        type={type}
                        id={id}
                        message={message}
                        isRemoving={isRemoving}
                        key={id}
                    />
                ))}
        </Notifications>
    );
}

export default _Notifications;
