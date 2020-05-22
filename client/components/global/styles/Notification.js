import styled, { keyframes, css } from 'styled-components';

const addAnimation = keyframes`
    from {opacity: 0;}
    to {opacity: 1;}
`;

const removeAnimation = keyframes`
    from {opacity: 1;}
    to {opacity: 0;}
`;

const NotificationWrapper = styled.div`
    border-radius: 10px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    margin: 10px 0;
    background: linear-gradient(90deg, #f5af19 0%, #f12711 100%);
    padding: 2px;
    animation: ${css`
        ${({ isRemoving }) =>
            isRemoving ? removeAnimation : addAnimation} linear 0.5s
    `};
`;

const handleBackgroundColor = (type) => {
    switch (type) {
        case 'success':
            return '#D4EDDA';
        case 'error':
            return '#F8D7DA';
        default:
            return 'white';
    }
};

const Notification = styled.div`
    position: relative;
    background-color: ${({ type }) => handleBackgroundColor(type)};
    padding: 20px;
    border-radius: inherit;
    font-size: 14px;
`;

const NotificationText = styled.p`
    text-align: center;
    color: rgb(34, 33, 33);
`;

const CloseButton = styled.a`
    position: absolute;
    font-size: 24px;
    color: #111111;
    top: 0;
    right: 0;
    padding-right: 7px;
    &:hover {
        color: #f36a15;
        cursor: pointer;
    }
`;

export { NotificationWrapper, Notification, NotificationText, CloseButton };
