import React from 'react';
import { Tooltip, TooltipContent } from './styled/Tooltip';

const _Tooltip = ({ children, content }) => (
    <Tooltip>
        {children}
        <TooltipContent>{content}</TooltipContent>
    </Tooltip>
);

export default _Tooltip;
