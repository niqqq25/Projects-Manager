import React from 'react';
import './table.css';

import Spinner from '../../sharedComponents/Spinner/Spinner';

export default function Table({ headers, bodyContent = [], loading, error }) {
    return (
        <div id="table-wrapper">
            <table id="table">
                <thead>
                    <tr>
                        {(headers || []).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>{loading ? <></> : bodyContent}</tbody>
            </table>
            {loading && !error && <Spinner block />}
            {error && (
                <p className="info-text">
                    <span style={{ color: 'red', fontWeight: 'bold' }}>
                        Error:{' '}
                    </span>
                    {error}
                </p>
            )}
            {!bodyContent.length && !loading && !error && (
                <p className="info-text">Nothing to see here!</p>
            )}
        </div>
    );
}
