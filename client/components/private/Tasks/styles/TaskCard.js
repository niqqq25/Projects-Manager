import styled, { css } from 'styled-components';

const TaskCardContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    @media (max-width: 600px) {
        flex-direction: column;
        align-items: normal;
    }
`;

const TaskCardContentLeft = styled.div``;
const TaskCardContentRight = styled.div`
    display: flex;
    align-items: center;
    @media (max-width: 600px) {
        margin-top: 24px;
        justify-content: space-between;
    }
`;

const TaskTitle = styled.h1`
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const TaskDescription = styled.p`
    font-size: 13px;
    color: ${({ theme }) => theme.text.alt};
    padding-top: 5px;
    text-overflow: ellipsis;
`;

const taskCard = css`
    align-self: flex-start;
    margin: 20px 0;
`;

export {
    TaskCardContent,
    TaskCardContentLeft,
    TaskCardContentRight,
    TaskTitle,
    TaskDescription,
    taskCard,
};
