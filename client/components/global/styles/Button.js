import styled from 'styled-components';

const ButtonContainer = styled.div`
    display: inline-block;
    width: 100%;
    background: ${props =>
        props.disabled ? 'lightgrey' : 'linear-gradient(#f5af19, #f12711)'};
    padding: 2px;
    border-radius: 20px;
`;

const Button = styled.button`
    width: 100%;
    border: none;
    text-transform: uppercase;
    padding: 10px 10px;
    font-weight: bold;
    font-size: inherit;
    border-radius: inherit;
    background-color: white;
    &:hover:enabled {
        opacity: 0.9;
        cursor: pointer;
        outline: none;
    }
    &:focus:enabled {
        outline: none;
    }
`;

export { ButtonContainer, Button };
