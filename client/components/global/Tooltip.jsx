import React from 'react';
import { Tooltip, TooltipContent } from './styled/Tooltip';

const _Tooltip = ({ children, content, top }) => (
    <Tooltip>
        {children}
        <TooltipContent top={top}>{content}</TooltipContent>
    </Tooltip>
);

export default _Tooltip;
