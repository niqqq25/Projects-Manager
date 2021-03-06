import styled, { css } from 'styled-components';

const Form = styled.form`
    width: 500px;
    display: inline-grid;
    position: absolute;
    right: 50%;
    transform: translate(50%);
    grid-row-gap: 20px;
    margin-top: 100px;
    background-color: ${({ theme }) => theme.bg.white};
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

const FormTitle = styled.h1`
    margin-bottom: 10px;
`;

const SignUpText = styled.p`
    text-align: center;
    font-size: 14px;
    color: ${({ theme }) => theme.text.primary};
`;

const submitButton = css`
    margin-top: 15px;
`;

const signUpLink = css`
    margin-left: 5px;
`;

export { Form, SignUpText, FormTitle, submitButton, signUpLink };
