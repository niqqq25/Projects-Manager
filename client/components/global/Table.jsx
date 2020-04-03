import React from 'react';
import {
    Table,
    SpinnerContainer,
    ErrorText,
    EmptyTableText,
} from './styles/Table';
import Spinner from './Spinner';

const _Table = ({ isError, isLoading, isEmpty, children, minWidth }) => (
    <>
        <Table minWidth={minWidth}>{children}</Table>

        {isLoading ? (
            <SpinnerContainer>
                <Spinner />
            </SpinnerContainer>
        ) : (
            <>
                {isError && <ErrorText>{error}</ErrorText>}
                {isEmpty && (
                    <EmptyTableText>Nothing to see here!</EmptyTableText>
                )}
            </>
        )}
    </>
);

export default _Table;
