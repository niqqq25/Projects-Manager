import React from 'react';
import ReactDOM from 'react-dom';
import Router from '../routers/private';

import GlobalStyles from '../components/shared/Global.styles';

ReactDOM.render(
    <>
        <Router />
        <GlobalStyles />
    </>,
    document.getElementById('root')
);
