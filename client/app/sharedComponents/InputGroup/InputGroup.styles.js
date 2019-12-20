import styled from 'styled-components';

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

const InputGroup__Label = styled.div`
    order: -1;
    pointer-events: none;
    transition: all 0.2s ease-in;
    transform: translateY(${props => (props.labelSliding ? 25 : 0)}px);
    color: ${props => (props.error ? 'red' : '#adadad')};
    font-size: 14px;
    padding-left: 5px;
    text-transform: capitalize;
`;

const InputGroup__Container = styled.div`
    &:after {
        content: '';
        display: block;
        height: 2px;
        background-image: linear-gradient(
            90deg,
            #f5af19 0%,
            #f12711 50%,
            #adadad 50%,
            #adadad 100%
        );
        background-size: 200%;
        background-position: right;
        transition: background-position 0.4s;
        background-position: ${props =>
            props.borderSliding ? 'right' : 'left'};
    }
    &:focus-within + ${InputGroup__Label} {
        transform: translateY(0px);
    }
    &:focus-within::after {
        background-position: left;
    }
`;

const InputGroup__Error = styled.p`
    margin-top: 2px;
    font-size: 12px;
    color: red;
`;

const InputGroup__RequiredSymbol = styled.p`
    display: inline-block;
    color: red;
`;

export default {
    InputGroup,
    InputGroup__Label,
    InputGroup__Container,
    InputGroup__Error,
    InputGroup__RequiredSymbol
};
