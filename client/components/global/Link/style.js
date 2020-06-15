import styled from 'styled-components';

const Link = styled.a`
    color: ${({ theme }) => theme.text.default};
    font-weight: bold;
    text-decoration: none;
    &:hover {
        color: ${({ theme }) => theme.text.primary};
        cursor: pointer;
    }
`;

export { Link };
