import React from 'react';
import { SearchBar } from './style';

const _SearchBar = ({ value, onChange, _css }) => (
    <SearchBar
        css={_css}
        type="search"
        placeholder="Search..."
        spellCheck="false"
        value={value}
        onChange={(e) => onChange(e.target.value)}
    />
);

export default _SearchBar;
