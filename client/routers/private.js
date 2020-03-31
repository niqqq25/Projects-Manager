import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ROUTES from '../constants/routes';

import Layout from '../components/private/Layout';
import Home from '../components/private/Home';
import NotFound from '../components/private/NotFound';
import Profile from '../components/private/Profile';

const router = () => (
    <BrowserRouter>
        <Layout>
            <Switch>
                <Route exact path={ROUTES.HOME} component={Home} />
                <Route exact path={ROUTES.PROFILE} component={Profile} />
                <Route component={NotFound} />
            </Switch>
        </Layout>
    </BrowserRouter>
);

export default router;
