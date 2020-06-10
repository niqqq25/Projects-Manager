import styled from 'styled-components';

const Team = styled.div`
    padding-top: 1.25rem;
`;

const TeamTitle = styled.h2`
    width: 100%;
    font-size: 0.875rem;
    font-weight: bold;
    margin-bottom: 0.3125rem;
`;

const TeamAvatars = styled.div`
    display: flex;
    flex-wrap: wrap;
    font-size: 0.75rem;
`;

const AvatarWrapper = styled.div`
    margin: 0 0.1875rem 0.1875rem 0;
`;

export { Team, TeamTitle, TeamAvatars, AvatarWrapper };
