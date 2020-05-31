import React from 'react';
import { Table, EmptyTableText, TableFooter } from './styled/Table';
import Spinner from './Spinner';

const _Table = ({ isLoading, isEmpty, children, minWidth, thead, tbody }) => (
    <>
        <Table minWidth={minWidth}>
            <thead>{thead}</thead>
            {!isLoading && !isEmpty ? <tbody>{tbody}</tbody> : null}
        </Table>

        <TableFooter>
            {isLoading && <Spinner size="small" />}
            {!isLoading && isEmpty && (
                <EmptyTableText>Nothing to see here!</EmptyTableText>
            )}
        </TableFooter>
    </>
);

export default _Table;
