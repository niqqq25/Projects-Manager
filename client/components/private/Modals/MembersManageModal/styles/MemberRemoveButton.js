import styled from 'styled-components';

const MemberRemoveButton = styled.a`
    color: ${({ theme }) => theme.text.light};
    margin-left: 5px;
    &:hover {
        color: #d95555;
        cursor: pointer;
    }
`;

export { MemberRemoveButton };
