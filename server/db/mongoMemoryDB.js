const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const mongodb = require("./mongodb");

class MongoMemoryDB {
    constructor() {
        this.server = new MongoMemoryServer();
        this.db = null;
    }

    async connect() {
        try {
            const url = await this.server.getConnectionString();
            await mongodb.connect(url);
            this.db = mongoose.connection.db;
        } catch (err) {
            console.log(err);
        }
    }

    async disconnect() {
        try {
            await mongoose.disconnect();
            this.server.stop();
        } catch (err) {
            console.log(err);
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

module.exports = MongoMemoryDB;
