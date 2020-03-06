import app from "./app";
import createDbConnection from './db/createDbConnection';

const PORT = process.env.PORT || 5000;

createDbConnection(process.env.MONGODB_URL);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})