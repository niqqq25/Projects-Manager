import styled from 'styled-components';

const EmptyCard = styled.div`    
    height: 150px;
    width 90%;
    margin: auto;
    border-radius: 8px;
    background: ${({ theme }) => theme.bg.white};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    color: ${({ theme }) => theme.text.light};
`;

export { EmptyCard };
