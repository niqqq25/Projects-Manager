import styled from 'styled-components';

const MemberRemoveButton = styled.a`
    color: ${({ theme }) => theme.text.lightgrey};
    margin-left: 5px;
    &:hover {
        color: #d95555;
        cursor: pointer;
    }
`;

export { MemberRemoveButton };
