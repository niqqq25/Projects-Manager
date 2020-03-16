import mongoose from "mongoose";
import createDbConnection from './createDbConnection';

class MongoMemoryDB {
    constructor() {
        this.db = null;
    }

    async connect() {
        try {
            await createDbConnection('test');
            this.db = mongoose.connection.db;
        } catch (err) {
            console.error(err.message);
        }
    }

    async disconnect() {
        try {
            await mongoose.disconnect();
        } catch (err) {
            console.error(err.message);
        }
    }
}

export default MongoMemoryDB;
