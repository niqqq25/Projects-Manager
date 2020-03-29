import styled from 'styled-components';

const AlertMessageContainer = styled.div`
    display: block;
    background: linear-gradient(90deg, #f5af19 0%, #f12711 100%);
    border-radius: 10px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    padding: 2px;
`;

const AlertMessage = styled.div`
    position: relative;
    background-color: ${props =>
        (props.success && '#D4EDDA') || (props.error && '#F8D7DA') || 'white'};
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

export {
    AlertMessage,
    AlertMessageContainer,
    AlertMessageText,
    CloseButton,
};
