import styled, { css } from 'styled-components';

const UserDeleteField = styled.p`
    text-align: center;
    font-size: 14px;
    color: ${({ theme }) => theme.text.primary};
`;

const userDeleteLink = css`
    margin-left: 5px;
`;

export { UserDeleteField, userDeleteLink };
