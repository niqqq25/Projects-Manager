const mongoose = require("mongoose");

module.exports = {
    async connect(url) {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
    }
};
