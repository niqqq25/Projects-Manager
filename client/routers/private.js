import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ROUTES from '../constants/routes';

import Layout from '../components/private/Layout';
import Home from '../components/private/Home';
import NotFound from '../components/private/NotFound';
import Profile from '../components/private/Profile';
// import Project from '../components/private/Project';

const router = () => (
    <BrowserRouter>
        <Layout>
            <Switch>
                <Route exact path={ROUTES.HOME} component={Home} />
                <Route exact path={ROUTES.PROFILE} component={Profile} />
                {/* <Route
                    exact
                    path={`${ROUTES.PROJECT}/:id`}
                    component={Project}
                /> */}
                <Route component={NotFound} />
            </Switch>
        </Layout>
    </BrowserRouter>
);

export default router;
