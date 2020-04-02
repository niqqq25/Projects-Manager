import styled from 'styled-components';

const AlertMessageContainer = styled.div`
    position: fixed;
    z-index: 999;
    right: 0;
    bottom: 0;
    margin: 20px;
    width: 300px;
    display: block;
    background: linear-gradient(90deg, #f5af19 0%, #f12711 100%);
    border-radius: 10px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    padding: 2px;
`;

const handleBackgroundColor = type => {
    switch (type) {
        case 'success':
            return '#D4EDDA';
        case 'error':
            return '#F8D7DA';
        default:
            return 'white';
    }
};

const AlertMessage = styled.div`
    position: relative;
    background-color: ${({ type }) => handleBackgroundColor(type)};
    padding: 20px;
    border-radius: inherit;
    font-size: 14px;
`;

const AlertMessageText = styled.p`
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

export { AlertMessage, AlertMessageContainer, AlertMessageText, CloseButton };
