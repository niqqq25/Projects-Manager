import styled from 'styled-components';

const LoginForm = styled.div`
    width: ${props => (props.isMobile ? '100%' : '400px')};
    padding-top: 50px;
    margin: 0 auto;
`;

const LoginForm__InputContainer = styled.div`
    margin-bottom: 20px;
`;

const LoginForm_ButtonContainer = styled.div`
    margin-top: 10px;
`;

const LoginForm__SignUpText = styled.p`
    padding-top: 20px;
    text-align: center;
    font-size: 14px;
    color: rgb(105, 105, 105);
`;

const SignUpText__Link = styled.a`
    color: rgb(43, 42, 42);
    padding-left: 5px;
    font-weight: bold;
    &:hover {
        color: #f36a15;
        cursor: pointer;
    }
`;

export default {
    LoginForm,
    LoginForm__InputContainer,
    LoginForm_ButtonContainer,
    LoginForm__SignUpText,
    SignUpText__Link,
};
