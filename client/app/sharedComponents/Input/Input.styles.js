import styled from 'styled-components';

const Input = styled.input`
    width: 100%;
    border: none;
    font-weight: bold;
    padding: 10px 5px;
    font-family: inherit;
    &:focus {
        outline: none;
    }
    &:disabled {
        background: inherit;
        text-align: center;
        color: #b2adb0;
    }
`;

export default { Input };
