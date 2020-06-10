import React from 'react';
import { withRouter } from 'react-router-dom';
import ROUTES from '../../../constants/routes';

import { Breadcrumb, BreadcrumbItem } from '../../global/styled/Breadcrumb';
import Link from '../../global/Link';

const _ProjectPageBreadcrumb = ({ history }) => (
    <Breadcrumb>
        <BreadcrumbItem>
            <Link onClick={() => history.push(ROUTES.PROJECTS)}>Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Project</BreadcrumbItem>
    </Breadcrumb>
);

export default withRouter(_ProjectPageBreadcrumb);
