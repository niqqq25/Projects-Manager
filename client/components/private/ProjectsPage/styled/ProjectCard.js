import styled from 'styled-components';

const ProjectCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    padding-top: 20px;
    margin: 0 20px 20px 20px;
    border-radius: 5px;
    background: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.2s ease-in-out, transform 0.2s;
    align-self: flex-start;
    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
        transform: scale(1.1);
        cursor: pointer;
    }
`;

const ProjectName = styled.h1`
    font-size: 15px;
`;

const ProjectDescription = styled.p`
    padding-top: 5px;
    font-size: 13px;
    color: grey;
    text-overflow: ellipsis;
`;

const ProjectInfoWrapper = styled.div`
    padding: 0 20px 20px 20px;
`;

const ProjectTeam = styled.div`
    padding-top: 20px;
`;

const ProjectTeamTitle = styled.h2`
    width: 100%;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
`;

const ProjectTeamAvatars = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const AvatarWrapper = styled.div`
    margin: 0 3px 3px 0;
    height: 32px;
`;

export {
    ProjectCard,
    ProjectName,
    ProjectDescription,
    ProjectInfoWrapper,
    ProjectTeam,
    ProjectTeamTitle,
    ProjectTeamAvatars,
    AvatarWrapper,
};
