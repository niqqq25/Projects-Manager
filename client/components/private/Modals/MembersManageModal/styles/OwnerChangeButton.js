import styled from 'styled-components';

const OwnerChangeButton = styled.a`
    color: ${({ theme }) => theme.text.light};
    &:hover {
        color: rgb(206, 170, 87);
        cursor: pointer;
    }
`;

export { OwnerChangeButton };
