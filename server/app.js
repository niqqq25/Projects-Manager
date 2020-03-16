import express from 'express';
import cookieParser from 'cookie-parser';
import Bundler from 'parcel-bundler';
import path from 'path';

import router from './routes/router';
import createDbConnection from './db/createDbConnection';

const app = express();

if (process.env.NODE_ENV !== 'test') {
    createDbConnection('admin');

    const entryFiles = path.join(__dirname, '..', './client/entries/*.js');
    const options = { sourceMaps: false };

    const bundler = new Bundler(entryFiles, options);
    bundler.bundle();

    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');

    app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));
}

app.use(express.json());
app.use(cookieParser());

app.use(router);

export default app;
