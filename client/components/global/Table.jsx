import React from 'react';
import {
    Table,
    TableHead,
    TableBody,
    SpinnerContainer,
    ErrorText,
    EmptyTableText,
} from './styles/Table';

import Spinner from './Spinner';

const _Table = ({ headerContent, bodyContent, error, loading }) => (
    <>
        <Table>
            <TableHead>
                <tr>{headerContent}</tr>
            </TableHead>
            <TableBody>
                {loading || error ? null : bodyContent}
            </TableBody>
        </Table>

        {loading && (
            <SpinnerContainer>
                <Spinner />
            </SpinnerContainer>
        )}

        {error && <ErrorText>{error}</ErrorText>}

        {!bodyContent.length && !loading && (
            <EmptyTableText>Nothing to see here!</EmptyTableText>
        )}
    </>
);

export default _Table;
