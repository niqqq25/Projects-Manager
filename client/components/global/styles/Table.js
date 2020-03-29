import styled from 'styled-components';

const Table = styled.table`
    width: 100%;
    background-color: white;
    border-collapse: collapse;
    border: solid transparent;
    table-layout: fixed;
    text-align: center;
`;

const TableHead = styled.thead`
    & th {
        padding: 12px;
        border: 1px solid #fd9656;
        background: transparent;
        border-bottom: 3px solid #fd9656;
    }
`;

const TableBody = styled.tbody`
    & td {
        padding: 12px;
        border: 1px solid #fd9656;
        background: transparent;
    }
    & > tr:hover {
        background-color: #ffeadc;
        cursor: pointer;
    }
`;

const SpinnerContainer = styled.div`
    width: 40px;
    height: 40px;
    margin: 10px auto 0 auto;
`;

const ErrorText = styled.p`
    color: red;
`;

const EmptyTableText = styled.p`
    margin: 10px 0 0 20px;
`;

export {
    Table,
    TableHead,
    TableBody,
    ErrorText,
    EmptyTableText,
    SpinnerContainer,
};
