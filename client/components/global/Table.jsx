import React from 'react';
import { Table, SpinnerContainer, EmptyTableText } from './styles/Table';
import Spinner from './Spinner';

const _Table = ({ isLoading, isEmpty, children, minWidth }) => (
    <>
        <Table minWidth={minWidth}>{children}</Table>

        {isLoading ? (
            <SpinnerContainer>
                <Spinner />
            </SpinnerContainer>
        ) : (
            <>
                {isEmpty && (
                    <EmptyTableText>Nothing to see here!</EmptyTableText>
                )}
            </>
        )}
    </>
);

export default _Table;
