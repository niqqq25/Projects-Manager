import styled from 'styled-components';

const ProjectEditModal = styled.div`
    position: relative;
    z-index: 10;
`;

const Form = styled.form`
    width: 500px;
    display: grid;
    grid-row-gap: 20px;
    margin: auto;
    background-color: white;
    padding: 40px 60px;
    border-radius: 10px;
    text-align: center;
    @media (max-width: 500px) {
        width: 100%;
        padding: 40px 20px;
        border-radius: 0px;
    }
`;

const FormTitle = styled.h1`
    margin-bottom: 10px;
`;

const SubmitButtonContainer = styled.div`
    margin-top: 20px;
`;

export { ProjectEditModal, Form, FormTitle, SubmitButtonContainer };
