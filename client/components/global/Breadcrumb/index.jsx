import React from 'react';
import { Breadcrumb, BreadcrumbItem } from './style';

const _Breadcrumb = ({ children }) => {
    return (
        <Breadcrumb>
            {React.Children.map(children, (item, index) =>
                item ? (
                    <BreadcrumbItem key={index}>{item}</BreadcrumbItem>
                ) : undefined
            )}
        </Breadcrumb>
    );
};

export default _Breadcrumb;
