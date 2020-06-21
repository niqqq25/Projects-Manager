import styled, { css } from 'styled-components';

const Members = styled.div`
    margin-bottom: 48px;
`;

const MembersTitle = styled.h2`
    margin-bottom: 8px;
    color: ${({ theme }) => theme.text.primary};
`;

const MembersAvatars = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;

const memberAvatar = css`
    margin: 4px;
`;

export { Members, MembersTitle, MembersAvatars, memberAvatar };
