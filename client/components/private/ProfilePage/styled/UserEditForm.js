import styled from 'styled-components';

const Form = styled.form`
    width: 500px;
    display: grid;
    grid-row-gap: 20px;
    background-color: white;
    padding: 40px 60px;
    margin: 0 20px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    @media (max-width: 700px) {
        box-shadow: none;
    }
    @media (max-width: 500px) {
        width: 100%;
        padding: 40px 20px;
        border-radius: 0px;
        margin: 0;
        grid-auto-rows: min-content;
    }
`;

const ButtonWrapper = styled.div`
    margin-top: 15px;
`;

export { Form, ButtonWrapper };
