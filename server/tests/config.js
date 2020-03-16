require('dotenv').config();

import MongoTestDB from '../db/mongoTestDB';
const db = new MongoTestDB();

import supertest from 'supertest';
import app from '../app';
const request = supertest.agent(app);

import seedData from '../db/seedData';
import data from './data';

async function seedUsers() {
    await seedData(db.db, 'users', data.users);
}

async function seedProjects() {
    await seedData(db.db, 'projects', data.projects);
}

async function seedTasks() {
    await seedData(db.db, 'tasks', data.tasks);
}

import ROUTES from '../../shared/routes';

function setInvalidUserToken() {
    request.jar.setCookie('user_token=1111');
}

async function login(username, password) {
    await request
        .post(`${ROUTES.USER.ROOT}${ROUTES.USER.LOGIN}`)
        .send({ username, password });
}

export {
    request,
    data,
    seedUsers,
    seedTasks,
    seedProjects,
    db,
    ROUTES,
    setInvalidUserToken,
    login,
};
