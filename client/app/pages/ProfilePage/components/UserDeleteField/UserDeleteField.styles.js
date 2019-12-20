import styled from 'styled-components';

const UserDeleteField = styled.p`
    padding-top: 20px;
    text-align: center;
    font-size: 14px;
    color: rgb(105, 105, 105);
`;

const UserDeleteField__Link = styled.a`
    color: rgb(43, 42, 42);
    padding-left: 5px;
    font-weight: bold;
    &:hover {
        color: #f36a15;
        cursor: pointer;
    }
`;

export default { UserDeleteField, UserDeleteField__Link };
