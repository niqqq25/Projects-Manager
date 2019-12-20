import styled from 'styled-components';

const Table = styled.table`
    width: 100%;
    background-color: white;
    border-collapse: collapse;
    border: solid transparent;
    table-layout: fixed;
    text-align: center;
`;

const Table__Head = styled.thead`
    & th {
        padding: 12px;
        border: 1px solid #fd9656;
        background: transparent;
        border-bottom: 3px solid #fd9656;
    }
`;

const Table__Body = styled.tbody`
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

const Table__ErrorText = styled.p`
    color: red;
`;

const Table__EmptyTableText = styled.p`
    margin: 10px 0 0 20px;
`;

export default {
    Table,
    Table__Head,
    Table__Body,
    SpinnerContainer,
    Table__ErrorText,
    Table__EmptyTableText
};
