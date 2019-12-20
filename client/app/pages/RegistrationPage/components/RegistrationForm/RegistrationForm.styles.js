import styled from 'styled-components';

const RegistrationForm = styled.div`
    width: ${props => (props.isMobile ? '100%' : '400px')};
    padding: 50px 0;
    margin: 0 auto;
`;

const RegistrationForm__InputContainer = styled.div`
    margin-bottom: 20px;
`;

const RegistrationForm__ButtonContainer = styled.div`
    margin-top: 10px;
`;

const RegistrationForm__LoginText = styled.p`
    padding-top: 20px;
    text-align: center;
    font-size: 14px;
    color: rgb(105, 105, 105);
`;

const LoginText__Link = styled.a`
    color: rgb(43, 42, 42);
    padding-left: 5px;
    font-weight: bold;
    &:hover {
        color: #f36a15;
        cursor: pointer;
    }
`;

export default {
    RegistrationForm,
    RegistrationForm__InputContainer,
    RegistrationForm__ButtonContainer,
    RegistrationForm__LoginText,
    LoginText__Link
};
