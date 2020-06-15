import styled, { css } from 'styled-components';

const Team = styled.div`
    padding-top: 20px;
`;

const TeamTitle = styled.h2`
    width: 100%;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
`;

const TeamAvatars = styled.div`
    display: flex;
    flex-wrap: wrap;
    font-size: 12px;
`;

const memberAvatar = css`
    margin: 0 3px 3px 0;
`;

export { Team, TeamTitle, TeamAvatars, memberAvatar };
