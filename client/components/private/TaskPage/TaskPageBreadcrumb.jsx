import React from 'react';
import { withRouter } from 'react-router-dom';
import ROUTES from '../../../constants/routes';

import { Breadcrumb, BreadcrumbItem } from '../../global/styled/Breadcrumb';
import Link from '../../global/Link';

const _TaskPageBreadcrumb = ({ history, parentTask, project }) => (
    <Breadcrumb>
        <BreadcrumbItem>
            <Link onClick={() => history.push(ROUTES.PROJECTS)}>Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
            <Link
                onClick={() => history.push(`${ROUTES.PROJECT}/${project._id}`)}
            >
                {`${project.title} (Project)`}
            </Link>
        </BreadcrumbItem>
        {parentTask && (
            <BreadcrumbItem>
                <Link
                    onClick={() =>
                        history.push(`${ROUTES.TASK}/${parentTask._id}`)
                    }
                >
                    {`${parentTask.title} (Task)`}
                </Link>
            </BreadcrumbItem>
        )}
        <BreadcrumbItem>Task</BreadcrumbItem>
    </Breadcrumb>
);

export default withRouter(_TaskPageBreadcrumb);
