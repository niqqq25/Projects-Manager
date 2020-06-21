import styled from 'styled-components';

const Link = styled.a`
    color: ${({ theme }) => theme.text.primary};
    font-weight: bold;
    text-decoration: none;
    &:hover {
        color: ${({ theme }) => theme.text.main};
        cursor: pointer;
    }
`;

export { Link };
