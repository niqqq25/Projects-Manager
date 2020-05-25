import styled from 'styled-components';

const Table = styled.table`
    width: 100%;
    background-color: white;
    border-collapse: collapse;
    border: solid transparent;
    table-layout: fixed;
    text-align: center;
    min-width: ${({ minWidth }) => minWidth || 'none'};
    & thead th {
        padding: 12px;
        border: 1px solid #fd9656;
        background: transparent;
        border-bottom: 3px solid #fd9656;
    }
    & tbody td {
        padding: 12px;
        border: 1px solid #fd9656;
        background: transparent;
    }
    & tbody tr:hover {
        background-color: #ffeadc;
        cursor: pointer;
    }
`;

const SpinnerContainer = styled.div`
    width: 40px;
    height: 40px;
    margin: 10px auto 0 auto;
`;

const EmptyTableText = styled.p`
    margin: 10px 0 0 20px;
`;

export { Table, EmptyTableText, SpinnerContainer };
