import React from 'react';
import { withRouter } from 'react-router-dom';
import ROUTES from '../../../constants/routes';

import { Link, Breadcrumb } from '../../global';

const _TaskPageBreadcrumb = ({ history, parentTask, project }) => (
    <Breadcrumb>
        <Link onClick={() => history.push(ROUTES.PROJECTS)}>Home</Link>
        <Link onClick={() => history.push(`${ROUTES.PROJECT}/${project._id}`)}>
            {`${project.title} (Project)`}
        </Link>
        {parentTask && (
            <Link
                onClick={() => history.push(`${ROUTES.TASK}/${parentTask._id}`)}
            >
                {`${parentTask.title} (Task)`}
            </Link>
        )}
        <>Task</>
    </Breadcrumb>
);

export default withRouter(_TaskPageBreadcrumb);
