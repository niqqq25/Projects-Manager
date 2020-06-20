import styled from 'styled-components';

const MemberAddButton = styled.a`
    color: ${({ theme }) => theme.text.lightgrey};
    &:hover {
        color: rgb(68, 178, 93);
        cursor: pointer;
    }
`;

export { MemberAddButton };
