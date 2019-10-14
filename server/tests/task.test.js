const MongoMemoryDB = require("../db/mongoMemoryDB");
const db = new MongoMemoryDB();

//request
const supertest = require("supertest");
const app = require("../server");
const request = supertest(app);

//models
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

describe("task", () => {
    describe("create task", () => {
        beforeEach(async () => {
            await seedUsers();
            await seedProjects();
        });
        it("should create task in project when project exists and user is an owner", async () => {
            const token = await logIn(
                data.users[1].username,
                data.users[1].password
            );
            await request
                .post(`/projects/${data.projects[0]._id}/tasks`)
                .send(data.tasks[0])
                .set("Authorization", token);
            const task = await Task.findById(data.tasks[0]._id);
            expect(task).toBeTruthy();
        });
        it("should add task into project tasks when task is created", async () => {
            const token = await logIn(
                data.users[1].username,
                data.users[1].password
            );
            await Project.findByIdAndUpdate(data.projects[0]._id, {
                $pull: { tasks: data.tasks[0]._id }
            });
            await request
                .post(`/projects/${data.projects[0]._id}/tasks`)
                .send(data.tasks[0])
                .set("Authorization", token);
            const project = await Project.findById(data.projects[0]._id);
            expect(project.tasks.includes(data.tasks[0]._id)).toBe(true);
        });
        it("should create task in project when project exists and user is a member", async () => {
            const token = await logIn(
                data.users[2].username,
                data.users[2].password
            );
            await request
                .post(`/projects/${data.projects[0]._id}/tasks`)
                .send(data.tasks[0])
                .set("Authorization", token);
            const task = await Task.findById(data.tasks[0]._id);
            expect(task).toBeTruthy();
        });
        it("should not create task in project when project exists and user is not a member", async () => {
            const token = await logIn(
                data.users[0].username,
                data.users[0].password
            );
            await request
                .post(`/projects/${data.projects[0]._id}/tasks`)
                .send(data.tasks[0])
                .set("Authorization", token);
            const task = await Task.findById(data.tasks[0]._id);
            expect(task).toBeFalsy();
        });
        it("should create task in task when task exists and user is a member", async () => {
            const token = await logIn(
                data.users[1].username,
                data.users[1].password
            );
            await request
                .post(`/projects/${data.projects[0]._id}/tasks`)
                .send(data.tasks[0])
                .set("Authorization", token);

            await request
                .post(`/tasks/${data.tasks[0]._id}`)
                .send(data.tasks[1])
                .set("Authorization", token);
            const task = await Task.findById(data.tasks[1]._id);
            expect(task).toBeTruthy();
        });
        it("should add task to parent task when task is created", async () => {
            const token = await logIn(
                data.users[1].username,
                data.users[1].password
            );
            await request
                .post(`/projects/${data.projects[0]._id}/tasks`)
                .send(data.tasks[0])
                .set("Authorization", token);
            await Task.findByIdAndUpdate(data.tasks[0]._id, {
                $pull: { tasks: data.tasks[1]._id }
            });
            await request
                .post(`/projects/${data.projects[0]._id}/tasks`)
                .send(data.tasks[1])
                .set("Authorization", token);
            const task = await Task.findById(data.tasks[0]._id);
            expect(task.tasks.includes(data.tasks[1]._id)).toBe(true);
        });
    });
    describe("get task by id", () => {
        let token;
        beforeEach(async () => {
            await seedUsers();
            await seedProjects();
            await seedTasks();
            token = await logIn(data.users[1].username, data.users[1].password);
        });
        it("should return task when valid task is presented", async () => {
            const task = await request
                .get(`/tasks/${data.tasks[0]._id}`)
                .set("Authorization", token);
            expect(task.body._id.toString()).toBe(data.tasks[0]._id.toString());
        });
        it("should return error when invalid task is presented", async () => {
            const task = await request
                .get(`/tasks/1111`)
                .set("Authorization", token);
            expect(task.status).toBe(400);
        });
    });
    describe("update task", () => {
        let token;
        beforeEach(async () => {
            await seedUsers();
            await seedProjects();
            await seedTasks();
            token = await logIn(data.users[1].username, data.users[1].password);
        });
        it("should update task description", async () => {
            const description = "New description";
            await request
                .patch(`/tasks/${data.tasks[0]._id}`)
                .send({ description })
                .set("Authorization", token);
            const task = await Task.findById(data.tasks[0]._id);
            expect(task.description).toBe(description);
        });
        it("should update task isCompleted when its boolean", async () => {
            await request
                .patch(`/tasks/${data.tasks[0]._id}`)
                .send({ isCompleted: true })
                .set("Authorization", token);
            const task = await Task.findById(data.tasks[0]._id);
            expect(task.isCompleted).toBe(true);
        });
        it("should not update task isCompleted when its not boolean", async () => {
            const isCompleted = "1111";
            await request
                .patch(`/tasks/${data.tasks[0]._id}`)
                .send({ isCompleted })
                .set("Authorization", token);
            const task = await Task.findById(data.tasks[0]._id);
            expect(task.isCompleted).not.toBe(isCompleted);
        });
        it("should not update when some updates are invalid", async () => {
            const updates = {
                description: "Valid",
                milk: "Invalid"
            };
            await request
                .patch(`/tasks/${data.tasks[0]._id}`)
                .send(updates)
                .set("Authorization", token);
            const task = await Task.findById(data.tasks[0]._id);
            expect(task.description).not.toBe(updates.description);
        });
    });
    describe("add assignee", () => {
        let token;
        beforeEach(async () => {
            await seedUsers();
            await seedProjects();
            await seedTasks();
            token = await logIn(data.users[1].username, data.users[1].password);
        });
        it("should add assignee when assigned user is project member", async () => {
            await request
                .post(`/tasks/${data.tasks[1]._id}/assignee`)
                .send({ id: data.users[2]._id })
                .set("Authorization", token);
            const task = await Task.findById(data.tasks[1]._id);
            expect(task.assignee).toStrictEqual(data.users[2]._id);
        });
        it("should not add assignee when assigned user is not project member", async () => {
            await request
                .post(`/tasks/${data.tasks[1]._id}/assignee`)
                .send({ id: data.users[0]._id })
                .set("Authorization", token);
            const task = await Task.findById(data.tasks[1]._id);
            expect(task.assignee).not.toStrictEqual(data.users[0]._id);
        });
        it("should add assignee when assigned user is a project member and there are already assigned member", async () => {
            //add assignee
            await request
                .post(`/tasks/${data.tasks[1]._id}/assignee`)
                .send({ id: data.users[2]._id })
                .set("Authorization", token);
            //reassign assignee
            await request
                .post(`/tasks/${data.tasks[1]._id}/assignee`)
                .send({ id: data.users[1]._id })
                .set("Authorization", token);
            const task = await Task.findById(data.tasks[1]._id);
            expect(task.assignee).toStrictEqual(data.users[1]._id);
        });
    });
    describe("remove assignee", () => {
        beforeEach(async () => {
            await seedUsers();
            await seedProjects();
            await seedTasks();
        });
        it("should remove assignee when user is a project member", async () => {
            const token = await logIn(
                data.users[1].username,
                data.users[1].password
            );
            await request
                .delete(`/tasks/${data.tasks[0]._id}/assignee`)
                .set("Authorization", token);
            const task = await Task.findById(data.tasks[0]._id);
            expect(task.assignee).toBeFalsy();
        });
        it("should not remove assigne when user is not a project member", async () => {
            const token = await logIn(
                data.users[0].username,
                data.users[0].password
            );
            await request
                .delete(`/tasks/${data.tasks[0]._id}/assignee`)
                .set("Authorization", token);
            const task = await Task.findById(data.tasks[0]._id);
            expect(task.assignee).toBeTruthy();
        });
    });
    describe("delete task", () => {
        beforeEach(async () => {
            await seedUsers();
            await seedProjects();
            await seedTasks();
        });
        it("should delete task when user is a project member", async () => {
            const token = await logIn(
                data.users[1].username,
                data.users[1].password
            );
            await request
                .delete(`/tasks/${data.tasks[0]._id}`)
                .set("Authorization", token);
            const task = await Task.findById(data.tasks[0]._id);
            expect(task).toBeFalsy();
        });
        it("should delete child tasks when parent task is deleted", async () => {
            const token = await logIn(
                data.users[1].username,
                data.users[1].password
            );
            await request
                .delete(`/tasks/${data.tasks[0]._id}`)
                .set("Authorization", token);
            const task = await Task.findById(data.users[1]._id);
            expect(task).toBeFalsy();
        });
        it("should remove task from project tasks when task is deleted", async () => {
            const token = await logIn(
                data.users[1].username,
                data.users[1].password
            );
            await request
                .delete(`/tasks/${data.tasks[0]._id}`)
                .set("Authorization", token);
            const project = await Project.findById(data.projects[0]._id);
            expect(project.tasks.includes(data.tasks[0]._id)).toBe(false);
        });
        it("should remove task from parent task when child task is deleted", async () => {
            const token = await logIn(
                data.users[1].username,
                data.users[1].password
            );
            await request
                .delete(`/tasks/${data.tasks[1]._id}`)
                .set("Authorization", token);
            const task = await Task.findById(data.tasks[0]._id);
            expect(task.tasks.includes(data.tasks[0]._id)).toBe(false);
        });
        it("should not remove task when user is not a project member", async () => {
            const token = await logIn(
                data.users[0].username,
                data.users[0].password
            );
            await request
                .delete(`/tasks/${data.tasks[0]._id}`)
                .set("Authorization", token);
            const task = await Task.findById(data.tasks[0]._id);
            expect(task).toBeTruthy();
        });
    });
});
