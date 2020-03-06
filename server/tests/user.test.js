import bcrypt from "bcrypt";
import MongoMemoryDB from "../db/mongoMemoryDB";
const db = new MongoMemoryDB();

//request
import supertest from "supertest";
import app from "../app";
const request = supertest(app);

//models
import User from "../models/user";
import Project from "../models/project";
import Task from "../models/task";

//load fake data
import data from "./data/testData";
import seedData from "../helpers/seedData";

async function seedUsers() {
    await seedData(db.db, "users", data.users);
}

async function seedProjects() {
    await seedData(db.db, "projects", data.projects);
}

async function seedTasks() {
    await seedData(db.db, "tasks", data.tasks);
}

async function logIn(username, password) {
    const res = await request
        .post("/users/signin")
        .send({ username, password });
    return res.body.token;
}

jest.setTimeout(30000);

beforeAll(async () => {
    await db.connect();
});

afterAll(async () => {
    await db.disconnect();
});

afterEach(async () => {
    await db.clear();
});

describe("user", () => {
    describe("signup", () => {
        it("should post user when required info is provided", async () => {
            const userData = data.users[0];
            await request.post("/users/signup").send(userData);
            const user = await User.findById(userData._id);
            expect(user).toBeTruthy();
        });

        it("should not post user when required info is not provided", async () => {
            const userData = {
                firstname: "Andrius",
                username: "admin",
                password: "admin"
            };
            await request.post("/users/signup").send(userData);
            const user = await User.find({ username: userData.firstname });
            expect(user.length).toBe(0);
        });
    });

    describe("signin", () => {
        beforeEach(async () => {
            await seedUsers();
        });

        it("should return token when user exists", async () => {
            const res = await request.post("/users/signin").send({
                username: data.users[0].username,
                password: data.users[0].password
            });
            expect(res.body.hasOwnProperty("token")).toBe(true);
        });

        it("should not return token when user doesnt exist", async () => {
            const res = await request.post("/users/signin").send({
                username: "wrong",
                password: data.users[0].password
            });
            expect(res.body.hasOwnProperty("token")).toBe(false);
        });

        it("should not return token when password is wrong", async () => {
            const res = await request.post("/users/signin").send({
                username: data.users[0].username,
                password: "wrong"
            });
            expect(res.body.hasOwnProperty("token")).toBe(false);
        });
    });

    describe("get my info", () => {
        let token;
        beforeEach(async () => {
            await seedUsers();
            token = await logIn(data.users[0].username, data.users[0].password);
        });

        it("should return my info when valid token is presented", async () => {
            const res = await request
                .get("/users/me")
                .set("Authorization", token);
            expect(res.body.username).toBe(data.users[0].username);
        });

        it("should not return my info when token is invalid", async () => {
            const res = await request
                .get("/users/me")
                .set("Authorization", "1111");
            expect(res.body.hasOwnProperty("_id")).toBe(false);
        });
    });

    describe("delete me", () => {
        beforeEach(async () => {
            await seedUsers();
            await seedProjects();
            await seedTasks();
        });

        it("should delete me when valid token is presented", async () => {
            const token = await logIn(
                data.users[0].username,
                data.users[0].password
            );
            await request.delete("/users/me").set("Authorization", token);
            const user = await User.findById(data.users[0]._id);
            expect(user).toBeFalsy();
        });

        it("should not delete me when I own a project", async () => {
            const token = await logIn(
                data.users[1].username,
                data.users[1].password
            );
            await request.delete("/users/me").set("Authorization", token);
            const user = await User.findById(data.users[1]._id);
            expect(user).toBeTruthy();
        });

        it("should remove me from projects when I am deleted", async () => {
            const token = await logIn(
                data.users[2].username,
                data.users[2].password
            );
            await request.delete("/users/me").set("Authorization", token);
            const projects = await Project.find({ members: data.users[2]._id });
            expect(projects.length).toBe(0);
        });

        it("should remove me from assigned tasks when I am deleted", async () => {
            const token = await logIn(
                data.users[2].username,
                data.users[2].password
            );
            await request.delete("/users/me").set("Authorization", token);
            const tasks = await Task.find({ assignee: data.users[2]._id });
            expect(tasks.length).toBe(0);
        });
    });

    describe("change my password", () => {
        let token;
        const newPassword = "admin1";
        beforeEach(async () => {
            await seedUsers();
            token = await logIn(data.users[0].username, data.users[0].password);
        });

        it("should change my password when valid token and new password is presented", async () => {
            await request
                .patch("/users/me/password")
                .send({ password: newPassword })
                .set("Authorization", token);
            const user = await User.findOne({
                username: data.users[0].username
            });
            const isNewPassword = await bcrypt.compare(
                newPassword,
                user.password
            );
            expect(isNewPassword).toBe(true);
        });

        it("shoud not change my password when valid token is presented and password is not presented", async () => {
            await request
                .patch("/users/me/password")
                .set("Authorization", token);
            const user = await User.findOne({
                username: data.users[0].username
            });
            const isNewPassword = await bcrypt.compare(
                newPassword,
                user.password
            );
            expect(isNewPassword).toBe(false);
        });

        it("shoud not change my password when invalid token is presented and password is presented", async () => {
            await request
                .patch("/users/me/password")
                .send({ password: newPassword })
                .set("Authorization", "1111");
            const user = await User.findOne({
                username: data.users[0].username
            });
            const isNewPassword = await bcrypt.compare(
                newPassword,
                user.password
            );
            expect(isNewPassword).toBe(false);
        });
    });

    describe("update me", () => {
        let token;
        const newFirstName = "Tobi";
        const newEmail = "tobi@gmail.com";
        beforeEach(async () => {
            await seedUsers();
            token = await logIn(data.users[0].username, data.users[0].password);
        });

        it("should update me when all changes are valid and token is presented", async () => {
            await request
                .patch("/users/me")
                .send({ firstname: newFirstName, email: newEmail })
                .set("Authorization", token);
            const user = await User.findOne({
                username: data.users[0].username
            });
            const isNewFirsname = user.firstname === newFirstName;
            const isNewEmail = user.email === newEmail;
            expect(isNewFirsname && isNewEmail).toBe(true);
        });

        it("should not update me when all changes are valid and token is not presented", async () => {
            await request
                .patch("/users/me")
                .send({ firstname: newFirstName, email: newEmail });
            const user = await User.findOne({
                username: data.users[0].username
            });
            const isNewFirsname = user.firstname === newFirstName;
            const isNewEmail = user.email === newEmail;
            expect(isNewFirsname && isNewEmail).toBe(false);
        });

        it("should not update me when changes are not valid and token is presented", async () => {
            await request
                .patch("/users/me")
                .send({
                    firstname: newFirstName,
                    email: newEmail,
                    password: "nop"
                })
                .set("Authorization", token);
            const user = await User.findOne({
                username: data.users[0].username
            });
            const isNewFirsname = user.firstname === newFirstName;
            const isNewEmail = user.email === newEmail;
            expect(isNewFirsname && isNewEmail).toBe(false);
        });

        it("should not update me when changes doesnt pass validation", async () => {
            await request
                .patch("/users/me")
                .send({
                    email: 'andrius'
                })
                .set("Authorization", token);
            const user = await User.findOne({
                username: data.users[0].username
            });
            expect(user.email).toBe(data.users[0].email);
        });
    });

    describe("get user by id", () => {
        let token;
        beforeEach(async () => {
            await seedUsers();
            token = await logIn(data.users[1].username, data.users[1].password);
        });

        it("should return user when user id is valid", async () => {
            const res = await request
                .get(`/users/${data.users[0]._id}`)
                .set("Authorization", token);
            expect(res.body.username).toBe(data.users[0].username);
        });

        it("should return error when user doesnt exist", async () => {
            const res = await request
                .get("/users/1111")
                .set("Authorization", token);
            expect(res.status).toBe(400);
        });
    });

    describe("get all users", () => {
        let token;
        beforeEach(async () => {
            await seedUsers();
            token = await logIn(data.users[1].username, data.users[1].password);
        });

        it("should return all users when there is no quary params", async () => {
            const res = await request.get("/users").set("Authorization", token);
            expect(res.body.length).toBe(data.users.length);
        });

        it("should return selected users when regex is provided", async () => {
            const regex = data.users[0].username.slice(0, 3);
            const res = await request
                .get(`/users?regex=${regex}`)
                .set("Authorization", token);
            const usernames = res.body.map(user => user.username);
            expect(
                usernames.every(username => username.slice(0, 3) === regex)
            ).toBe(true);
        });

        it("should return users which arent members of project when project id is provided and isMembers set to false", async () => {
            const res = await request
                .get(`/users?project=${data.projects[0]._id}&isMembers=false`)
                .set("Authorization", token);
            const userIds = res.body.map(user => user._id);
            const isUserIncluded = userIds.includes(
                data.users[0]._id.toString()
            );
            const isMembersIncluded = userIds.includes(
                data.users[1]._id.toString()
            );
            expect(isUserIncluded && !isMembersIncluded).toBe(true);
        });

        it("should return members of project when project id is provided", async () => {
            const res = await request
                .get(`/users?project=${data.projects[0]._id}`)
                .set("Authorization", token);
            const userIds = res.body.map(user => user._id);
            const isUserIncluded = userIds.includes(
                data.users[0]._id.toString()
            );
            const isMembersIncluded = userIds.includes(
                data.users[1]._id.toString()
            );
            expect(!isUserIncluded && isMembersIncluded).toBe(true);
        });

        it("should return error when user does not exist in provided project", async () => {
            const myToken = await logIn(
                data.users[0].username,
                data.users[0].password
            );
            const res = await request
                .get(`/users?project=${data.projects[0]._id}`)
                .set("Authorization", myToken);
            expect(res.status).toBe(400);
        });
    });
});
