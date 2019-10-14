const PORT = process.env.PORT || 5000;
const app = require("./server");
const mongodb = require("./db/mongodb");

mongodb.connect(process.env.MONGODB_URL);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})