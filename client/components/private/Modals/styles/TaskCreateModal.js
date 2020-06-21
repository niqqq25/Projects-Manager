import styled, { css } from 'styled-components';

const modalOuter = css`
    z-index: 10;
`;

const Form = styled.form`
    width: 400px;
    display: grid;
    grid-row-gap: 20px;
    padding: 0 10px 20px 10px;
    margin: auto;
    background-color: ${({ theme }) => theme.bg.white};
    border-radius: 10px;
    text-align: center;
    @media (max-width: 500px) {
        width: 100%;
        border-radius: 0px;
    }
`;

const submitButton = css`
    margin-top: 20px;
`;

export { Form, submitButton, modalOuter };
