import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Layout from '../components/public/Layout';
import Login from '../components/public/Login';
import Signup from '../components/public/Signup';

const router = () => (
    <BrowserRouter>
        <Layout>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Redirect to="/login" />
            </Switch>
        </Layout>
    </BrowserRouter>
);

export default router;
