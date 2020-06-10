import React, { useState } from 'react';
import { Dropdown, DropdownContent } from './styled/Dropdown';

function _Dropdown({ toggle, content }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dropdown
            tabIndex="0"
            onClick={() => setIsOpen(!isOpen)}
            onBlur={() => setIsOpen(false)}
        >
            {toggle}
            <DropdownContent isOpen={isOpen}>{content}</DropdownContent>
        </Dropdown>
    );
}

export default _Dropdown;
