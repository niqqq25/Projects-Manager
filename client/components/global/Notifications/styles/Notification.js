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
    background: ${({ theme }) => theme.bg.horizontalGradient};
    padding: 2px;
    animation: ${css`
        ${({ isRemoving }) =>
            isRemoving ? removeAnimation : addAnimation} linear 0.5s
    `};
`;

const handleBackgroundColor = (type, theme) => {
    switch (type) {
        case 'success':
            return theme.success.light;
        case 'error':
            return theme.warning.light;
        default:
            return theme.bg.white;
    }
};

const Notification = styled.div`
    position: relative;
    background-color: ${({ type, theme }) =>
        handleBackgroundColor(type, theme)};
    padding: 20px;
    border-radius: inherit;
    font-size: 14px;
`;

const NotificationText = styled.p`
    text-align: center;
    color: ${({ theme }) => theme.text.primary};
`;

const CloseButton = styled.a`
    position: absolute;
    font-size: 24px;
    color: ${({ theme }) => theme.text.primary};
    top: 0;
    right: 0;
    padding-right: 7px;
    &:hover {
        color: ${({ theme }) => theme.text.main};
        cursor: pointer;
    }
`;

export { NotificationWrapper, Notification, NotificationText, CloseButton };
