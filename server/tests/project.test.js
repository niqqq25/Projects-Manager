const MongoMemoryDB = require("../db/mongoMemoryDB");
const db = new MongoMemoryDB();

//request
const supertest = require("supertest");
const app = require("../server");
const request = supertest(app);

//models
const User = require("../models/user");
const Project = require("../models/project");
const Task = require("../models/task");

//load fake data
const data = require("./data/testData");
const seedData = require("../helpers/seedData");
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

describe("project", () => {
    describe("create project", () => {
        let token;
        beforeEach(async () => {
            await seedUsers();
            token = await logIn(data.users[0].username, data.users[0].password);
        });
        it("should create project when all required info is presented and token is valid", async () => {
            await request
                .post("/projects")
                .send(data.projects[0])
                .set("Authorization", token);
            const project = await Project.findById(data.projects[0]._id);
            expect(project).toBeTruthy();
        });
        it("should add user to owner and members when project is created", async () => {
            await request
                .post("/projects")
                .send(data.projects[0])
                .set("Authorization", token);
            const project = await Project.findById(data.projects[0]._id);
            const isOwner =
                project.owner.toString() === data.users[0]._id.toString();
            const isMember = project.members.includes(data.users[0]._id);
            expect(isOwner && isMember).toBe(true);
        });
        it("should add project to user projects when project is created", async () => {
            await request
                .post("/projects")
                .send(data.projects[0])
                .set("Authorization", token);
            const user = await User.findById(data.users[0]._id);
            expect(user.projects.includes(data.projects[0]._id)).toBe(true);
        });
        it("should not create project when all required info is not presented", async () => {
            const projectData = Object.assign({}, data.projects[0]);
            delete projectData.title;
            await request
                .post("/projects")
                .send(projectData)
                .set("Authorization", token);
            const project = await Project.findById(data.projects[0]._id);
            expect(project).toBeFalsy();
        });
        it("should not add project to user projects when project is not created", async () => {
            const projectData = Object.assign({}, data.projects[0]);
            delete projectData.title;
            await request
                .post("/projects")
                .send(projectData)
                .set("Authorization", token);
            const user = await User.findById(data.users[0]._id);
            expect(user.projects.includes(projectData._id)).toBe(false);
        });
    });
    describe("get projects", () => {
        let token;
        beforeEach(async () => {
            await seedUsers();
            await seedProjects();
            token = await logIn(data.users[1].username, data.users[1].password);
        });
        it("should get all user projects when valid token is presented", async () => {
            const res = await request
                .get("/projects")
                .set("Authorization", token);
            const projects = res.body;
            const projectIds = projects.map(project => project._id);
            expect(projectIds.includes(data.projects[0]._id.toString())).toBe(
                true
            );
        });
        it("should not get any projects when invalid token is presented", async () => {
            const res = await request
                .get("/projects")
                .set("Authorization", "1111");
            expect(res.status).toBe(400);
        });
    });
    describe("get project by id", () => {
        beforeEach(async () => {
            await seedUsers();
            await seedProjects();
        });
        it("should get project when user has access to the project", async () => {
            const token = await logIn(
                data.users[1].username,
                data.users[1].password
            );
            const res = await request
                .get(`/projects/${data.projects[0]._id}`)
                .set("Authorization", token);
            expect(res.body.title).toBe(data.projects[0].title);
        });
        it("should not get project when user doesnt have access to the project", async () => {
            const token = await logIn(
                data.users[0].username,
                data.users[0].password
            );
            const res = await request
                .get(`/projects/${data.projects[0]._id}`)
                .set("Authorization", token);
            expect(res.status).toBe(400);
        });
        it("should not return any project when project does not exist", async () => {
            const token = await logIn(
                data.users[1].username,
                data.users[1].password
            );
            const res = await request
                .get(`/projects/1111`)
                .set("Authorization", token);
            expect(res.status).toBe(400);
        });
    });
    describe("update project by id", () => {
        beforeEach(async () => {
            await seedUsers();
            await seedProjects();
        });
        it("should update project when user is owner and updates are valid", async () => {
            const token = await logIn(
                data.users[1].username,
                data.users[1].password
            );
            const newTitle = "new";
            await request
                .patch(`/projects/${data.projects[0]._id}`)
                .send({ title: newTitle })
                .set("Authorization", token);
            const project = await Project.findById(data.projects[0]._id);
            expect(project.title).toBe(newTitle);
        });
        it("should not update project when user is not owner and updates are valid", async () => {
            const token = await logIn(
                data.users[0].username,
                data.users[0].password
            );
            const newTitle = "new";
            await request
                .patch(`/projects/${data.projects[0]._id}`)
                .send({ title: newTitle })
                .set("Authorization", token);
            const project = await Project.findById(data.projects[0]._id);
            expect(project.title).not.toBe(newTitle);
        });
        it("should not update project when user is owner and updates are invalid", async () => {
            const token = await logIn(
                data.users[1].username,
                data.users[1].password
            );
            const newTitle = "new";
            await request
                .patch(`/projects/${data.projects[0]._id}`)
                .send({ title: newTitle, isValid: false })
                .set("Authorization", token);
            const project = await Project.findById(data.projects[0]._id);
            expect(project.title).not.toBe(newTitle);
        });
        describe("change owner", () => {
            it("should change owner user is an owner", async () => {
                const token = await logIn(
                    data.users[1].username,
                    data.users[1].password
                );
                await request
                    .patch(`/projects/${data.projects[0]._id}`)
                    .send({ owner: data.users[2]._id })
                    .set("Authorization", token);
                const project = await Project.findById(data.projects[0]._id);
                expect(project.owner).toStrictEqual(data.users[2]._id);
            });
            it("should not change owner when user is not an owner", async () => {
                const token = await logIn(
                    data.users[2].username,
                    data.users[2].password
                );
                await request
                    .patch(`/projects/${data.projects[0]._id}`)
                    .send({ owner: data.users[2]._id })
                    .set("Authorization", token);
                const project = await Project.findById(data.projects[0]._id);
                expect(project.owner).not.toStrictEqual(data.users[2]._id);
            });
            it("should not change owner when member does not exist", async () => {
                const token = await logIn(
                    data.users[1].username,
                    data.users[1].password
                );
                await request
                    .patch(`/projects/${data.projects[0]._id}`)
                    .send({ owner: data.users[0]._id })
                    .set("Authorization", token);
                const project = await Project.findById(data.projects[0]._id);
                expect(project.owner).not.toStrictEqual(data.users[0]._id);
            });
        });
    });
    describe("delete project by id", () => {
        beforeEach(async () => {
            await seedUsers();
            await seedProjects();
            await seedTasks();
        });
        it("should delete project when user is owner", async () => {
            const token = await logIn(
                data.users[1].username,
                data.users[1].password
            );
            await request
                .delete(`/projects/${data.projects[0]._id}`)
                .set("Authorization", token);
            const project = await Project.findById(data.projects[0]._id);
            expect(project).toBeFalsy();
        });
        it("should not delete project when user is not owner", async () => {
            const token = await logIn(
                data.users[2].username,
                data.users[2].password
            );
            await request
                .delete(`/projects/${data.projects[0]._id}`)
                .set("Authorization", token);
            const project = await Project.findById(data.projects[0]._id);
            expect(project).toBeTruthy();
        });
        it("should remove tasks when project is deleted", async () => {
            const token = await logIn(
                data.users[1].username,
                data.users[1].password
            );
            await request
                .delete(`/projects/${data.projects[0]._id}`)
                .set("Authorization", token);
            const tasks = await Task.find({ project: data.projects[0]._id });
            expect(tasks.length).toBe(0);
        });
        it("should remove project from members projects when project is deleted", async () => {
            const token = await logIn(
                data.users[1].username,
                data.users[1].password
            );
            await request
                .delete(`/projects/${data.projects[0]._id}`)
                .set("Authorization", token);
            const user = await User.findById(data.users[1]._id);
            expect(user.projects.includes(data.projects[0]._id)).toBe(false);
        });
    });
    describe("add member to project", () => {
        beforeEach(async () => {
            await seedUsers();
            await seedProjects();
        });
        it("should add member to project when user is an owner", async () => {
            const token = await logIn(
                data.users[1].username,
                data.users[1].password
            );
            await request
                .post(`/projects/${data.projects[0]._id}/members`)
                .send({ id: data.users[0]._id })
                .set("Authorization", token);
            const project = await Project.findById(data.projects[0]._id);
            expect(project.members.includes(data.users[0]._id)).toBe(true);
        });
        it("should add project to user projects when user is added", async () => {
            const token = await logIn(
                data.users[1].username,
                data.users[1].password
            );
            await request
                .post(`/projects/${data.projects[0]._id}/members`)
                .send({ id: data.users[0]._id })
                .set("Authorization", token);
            const user = await User.findById(data.users[0]._id);
            expect(user.projects.includes(data.projects[0]._id)).toBe(true);
        });
        it("should not add member to project when user is not an owner", async () => {
            const token = await logIn(
                data.users[2].username,
                data.users[2].password
            );
            await request
                .post(`/projects/${data.projects[0]._id}/members`)
                .send({ id: data.users[0]._id })
                .set("Authorization", token);
            const project = await Project.findById(data.projects[0]._id);
            expect(project.members.includes(data.users[0]._id)).toBe(false);
        });
        it("should not add member to project when user is a member", async () => {
            const token = await logIn(
                data.users[1].username,
                data.users[1].password
            );
            const res = await request
                .post(`/projects/${data.projects[0]._id}/members`)
                .send({ id: data.users[2]._id })
                .set("Authorization", token);
            expect(res.status).toBe(400);
        });
    });
    describe("remove member from project", () => {
        beforeEach(async () => {
            await seedUsers();
            await seedProjects();
        });
        it("should remove user from members when owner does it", async () => {
            const token = await logIn(
                data.users[1].username,
                data.users[1].password
            );
            await request
                .delete(`/projects/${data.projects[0]._id}/members`)
                .send({ id: data.users[2]._id })
                .set("Authorization", token);
            const project = await Project.findById(data.projects[0]._id);
            expect(project.members.includes(data.users[2]._id)).toBe(false);
        });
        it("should remove user from members when same user does it", async () => {
            const token = await logIn(
                data.users[2].username,
                data.users[2].password
            );
            await request
                .delete(`/projects/${data.projects[0]._id}/members`)
                .send({ id: data.users[2]._id })
                .set("Authorization", token);
            const project = await Project.findById(data.projects[0]._id);
            expect(project.members.includes(data.users[2]._id)).toBe(false);
        });
        it("should not remove owner from members", async () => {
            const token = await logIn(
                data.users[1].username,
                data.users[1].password
            );
            await request
                .delete(`/projects/${data.projects[0]._id}/members`)
                .send({ id: data.users[1]._id })
                .set("Authorization", token);
            const project = await Project.findById(data.projects[0]._id);
            expect(project.members.includes(data.users[1]._id)).toBe(true);
        });
        it("should not remove user from members when other member does it", async () => {
            const token = await logIn(
                data.users[2].username,
                data.users[2].password
            );
            await request
                .delete(`/projects/${data.projects[0]._id}/members`)
                .send({ id: data.users[1]._id })
                .set("Authorization", token);
            const project = await Project.findById(data.projects[0]._id);
            expect(project.members.includes(data.users[1]._id)).toBe(true);
        });
        it("should return error when user doesnt exist", async () => {
            const token = await logIn(
                data.users[1].username,
                data.users[1].password
            );
            const res = await request
                .delete(`/projects/${data.projects[0]._id}/members`)
                .send({ id: "1111" })
                .set("Authorization", token);
            expect(res.status).toBe(400);
        });
        it("should return error when project doesnt exist", async () => {
            const token = await logIn(
                data.users[1].username,
                data.users[1].password
            );
            const res = await request
                .delete(`/projects/1111/members`)
                .send({ id: data.users[2]._id })
                .set("Authorization", token);
            expect(res.status).toBe(400);
        });
    });
});
