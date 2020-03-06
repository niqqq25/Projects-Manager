import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import createDbConnection from './createDbConnection';

class MongoMemoryDB {
    constructor() {
        this.server = new MongoMemoryServer();
        this.db = null;
    }

    async connect() {
        try {
            const url = await this.server.getConnectionString();
            await createDbConnection(url);
            this.db = mongoose.connection.db;
        } catch (err) {
            console.error(err.message);
        }
    }

    async disconnect() {
        try {
            await mongoose.disconnect();
            this.server.stop();
        } catch (err) {
            console.error(err.message);
        }
    }

    async clear() {
        const collections = await this.db.listCollections().toArray();
        const collectionNames = collections.map(collection => collection.name);

        collectionNames.forEach(async collectionName => {
            await this.db.dropCollection(collectionName);
        });
    }
}

export default MongoMemoryDB;
