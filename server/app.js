import express from 'express';
import Bundler from 'parcel-bundler';
import path from 'path';
import router from './routes/router';
import createDbConnection from './db/createDbConnection';

const PORT = process.env.PORT || 5001;
const app = express();

async function server() {
    await createDbConnection(process.env.MONGODB_URL);

    app.use(express.json());

    const entryFiles = path.join(__dirname, '..', './client/index.js'); //'../client/*/index.js'
    const options = { sourceMaps: false };
    const bundler = new Bundler(entryFiles, options);
    bundler.bundle();

    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');

    app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));

    app.use(router);

    app.listen(PORT, () => {
        console.log(`Listening on ${PORT}`);
    });
}

export default server;
