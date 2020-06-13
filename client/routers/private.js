import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ROUTES from '../constants/routes';

import Layout from '../components/private/Layout';
import ProjectsPage from '../components/private/ProjectsPage';
import NotFoundPage from '../components/private/NotFoundPage';
import ProfilePage from '../components/private/ProfilePage';
import ProjectPage from '../components/private/ProjectPage';
import TaskPage from '../components/private/TaskPage';

const router = () => (
    <BrowserRouter>
        <Layout>
            <Switch>
                <Route exact path={ROUTES.PROJECTS} component={ProjectsPage} />
                <Route exact path={ROUTES.PROFILE} component={ProfilePage} />
                <Route
                    exact
                    path={`${ROUTES.PROJECT}/:id`}
                    component={ProjectPage}
                />
                <Route exact path={`${ROUTES.TASK}/:id`} component={TaskPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </Layout>
    </BrowserRouter>
);

export default router;
