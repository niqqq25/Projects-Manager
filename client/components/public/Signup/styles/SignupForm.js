import styled from 'styled-components';

const Form = styled.form`
    width: 500px;
    display: grid;
    grid-row-gap: 20px;
    margin: auto;
    margin-top: 100px;
    background-color: white;
    padding: 40px 60px;
    border-radius: 10px;
    text-align: center;
    @media (max-width: 500px) {
        width: 100%;
        padding: 40px 20px;
        border-radius: 0px;
        margin: 0;
        min-height: 100vh;
        grid-auto-rows: min-content;
    }
`;

const ButtonContainer = styled.div`
    margin-top: 15px;
`;

const LoginText = styled.p`
    text-align: center;
    font-size: 14px;
    color: rgb(105, 105, 105);
`;

const FormTitle = styled.h1`
    margin-bottom: 10px;
`;

export { Form, ButtonContainer, LoginText, FormTitle };
