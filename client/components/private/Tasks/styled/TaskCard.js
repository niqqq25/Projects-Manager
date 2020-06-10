import styled from 'styled-components';
import { card } from '../../../global/styles/card';

const TaskCard = styled.div`
    ${card}
    align-self: flex-start;
    margin: 1.25rem 0;
`;

const TaskCardContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem;
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
        margin-top: 1.5rem;
        justify-content: space-between;
    }
`;

const TaskTitle = styled.h1`
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const TaskDescription = styled.p`
    font-size: 0.8125rem;
    color: grey;
    padding-top: 0.3125rem;
    text-overflow: ellipsis;
`;

export {
    TaskCard,
    TaskCardContent,
    TaskCardContentLeft,
    TaskCardContentRight,
    TaskTitle,
    TaskDescription,
};
