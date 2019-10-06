const express = require('express');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '.env')});
const userRouter = require('./routes/users');
const projectRouter = require('./routes/projects');
const taskRouter = require('./routes/tasks');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

express()
    .use(express.json())
    .use(userRouter)
    .use(projectRouter)
    .use(taskRouter)
    .listen(PORT, () => {
        console.log(`Listening on ${PORT}`);
    });
