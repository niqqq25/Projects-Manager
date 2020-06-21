import React from 'react';
import { withRouter } from 'react-router-dom';
import ROUTES from '../../../constants/routes';

import { Link, Breadcrumb } from '../../global';

const _ProjectPageBreadcrumb = ({ history }) => (
    <Breadcrumb>
        <Link onClick={() => history.push(ROUTES.PROJECTS)}>Home</Link>
        <>Project</>
    </Breadcrumb>
);

export default withRouter(_ProjectPageBreadcrumb);
