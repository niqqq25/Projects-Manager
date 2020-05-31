import styled from 'styled-components';

const ProjectProgressBar = styled.div`
    background: #a9a7a7;
    width: 100%;
    height: 25px;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
`;

const ProjectProgressBarInner = styled.div`
    display: block;
    width: ${({ percentage }) => percentage}%;
    height: 100%;
    background: linear-gradient(90deg, #f5af19, #f12711);
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const ProjectProgressBarInnerTitle = styled.span`
    margin-right: 10px;
    font-weight: bold;
    color: white;
`;

export {
    ProjectProgressBar,
    ProjectProgressBarInner,
    ProjectProgressBarInnerTitle,
};
