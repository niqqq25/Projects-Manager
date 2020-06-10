import React from 'react';
import { SearchBar } from './styled/SearchBar';

const _SearchBar = ({ value, onChange }) => (
    <SearchBar
        type="text"
        placeholder="Search..."
        spellCheck="false"
        value={value}
        onChange={(e) => onChange(e.target.value)}
    />
);

export default _SearchBar;
