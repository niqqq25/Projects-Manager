import mongoose from "mongoose";

export default async function createDbConnection(db = 'default') {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    };

    const url = `mongodb://localhost:27017/${db}`;

    await mongoose.connect(url, options);
}
