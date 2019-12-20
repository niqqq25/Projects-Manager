import styled from 'styled-components';

const Form = styled.form`
    display: block;
    background-color: white;
    padding: 20px 60px;
    border-radius: 10px;
    box-shadow: ${props =>
        props.disableShadow ? 'none' : '0 1px 5px rgba(0, 0, 0, 0.15)'};
    text-align: center;
`;

const Form__Title = styled.p`
    font-size: 20px;
    background: -webkit-linear-gradient(#f5af19, #f12711);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 10px 0px 20px 0px;
`;

export default {
    Form,
    Form__Title,
};
