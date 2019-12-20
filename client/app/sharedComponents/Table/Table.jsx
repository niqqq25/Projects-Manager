import React from 'react';
import Styled from './Table.styles';

import Spinner from '../Spinner';

export default function Table({
    headers,
    bodyContent,
    error,
    loading,
    styles,
}) {
    return (
        <>
            <Styled.Table style={styles}>
                <Styled.Table__Head>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </Styled.Table__Head>
                <Styled.Table__Body>
                    {loading || error ? <></> : bodyContent}
                </Styled.Table__Body>
            </Styled.Table>
            {loading && (
                <Styled.SpinnerContainer>
                    <Spinner />
                </Styled.SpinnerContainer>
            )}
            {error && (
                <Styled.Table__ErrorText>{error}</Styled.Table__ErrorText>
            )}
            {!bodyContent.length && !loading && (
                <Styled.Table__EmptyTableText>
                    Nothing to see here!
                </Styled.Table__EmptyTableText>
            )}
        </>
    );
}
