import { expect } from 'chai';

import {
    request,
    data,
    seedUsers,
    seedTasks,
    seedProjects,
    db,
    ROUTES,
    login,
} from './config';

//models
import { User, Project, Task } from '../models';

before(async () => {
    await db.connect();
});

after(async () => {
    await db.disconnect();
});

afterEach(async () => {
    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});
});

describe('task API', () => {
    describe('GET /api/tasks/:task_id', () => {
        const task = data.tasks[0];

        beforeEach(async () => {
            await seedUsers();
            await seedProjects();
            await seedTasks();
        });

        it('should return task when user has access to it', async () => {
            const { username, password } = data.users[2];

            await login(username, password);
            const res = await request.get(`${ROUTES.TASK.ROOT}/${task._id}`);

            expect(res.body.task._id).to.equal(task._id);
        });

        it('should not return task when user does not have access to it', async () => {
            const { username, password } = data.users[0];

            await login(username, password);
            const res = await request.get(`${ROUTES.TASK.ROOT}/${task._id}`);
            expect(res.body.task).to.not.be.ok;
        });

        it('should not return task when task doesnt exist', async () => {
            const { username, password } = data.users[2];

            await login(username, password);
            const res = await request.get(
                `${ROUTES.TASK.ROOT}/bdbdf88028e375d81dccee42`
            );
            expect(res.body.task).to.not.be.ok;
        });
    });

    describe('PATCH /api/tasks/:task_id', () => {
        const task = data.tasks[0];

        beforeEach(async () => {
            await seedUsers();
            await seedProjects();
            await seedTasks();
        });

        it('should update when user is member and updates are valid', async () => {
            const description = 'New description';
            const isCompleted = true;
            const { username, password } = data.users[2];

            await login(username, password);
            await request
                .patch(`${ROUTES.TASK.ROOT}/${task._id}`)
                .send({ description, isCompleted });

            const $task = await Task.findById(task._id);
            expect($task.description).to.equal(description);
        });

        it('should not update when user is member and updates are not valid', async () => {
            const description = 'New description';
            const milk = 'Invalid';
            const { username, password } = data.users[2];

            await login(username, password);
            await request
                .patch(`${ROUTES.TASK.ROOT}/${task._id}`)
                .send({ description, milk });

            const $task = await Task.findById(task._id);
            expect($task.description).to.not.equal(description);
        });

        it('should not update when user is not a member and updates are valid', async () => {
            const description = 'New description';
            const isCompleted = true;
            const { username, password } = data.users[0];

            await login(username, password);
            await request
                .patch(`${ROUTES.TASK.ROOT}/${task._id}`)
                .send({ description, isCompleted });

            const $task = await Task.findById(task._id);
            expect($task.description).to.not.equal(description);
        });

        it('should return updated task when its updated', async () => {
            const description = 'New description';
            const isCompleted = true;
            const { username, password } = data.users[2];

            await login(username, password);
            const res = await request
                .patch(`${ROUTES.TASK.ROOT}/${task._id}`)
                .send({ description, isCompleted });

            expect(res.body.task.description).to.equal(description);
        });
    });

    describe('DELETE /api/tasks/:task_id', () => {
        beforeEach(async () => {
            await seedUsers();
            await seedProjects();
            await seedTasks();
        });

        it('should delete task when user is a project member', async () => {
            const { username, password } = data.users[1];
            const task = data.tasks[0];

            await login(username, password);
            await request.delete(`${ROUTES.TASK.ROOT}/${task._id}`);

            const $task = await Task.findById(task._id);
            expect($task).to.not.be.ok;
        });

        it('should delete child tasks when parent task is deleted', async () => {
            const { username, password } = data.users[1];
            const taskParent = data.tasks[0];
            const task = data.tasks[1];

            await login(username, password);
            await request.delete(`${ROUTES.TASK.ROOT}/${taskParent._id}`);

            const $task = await Task.findById(task._id);
            expect($task).to.not.be.ok;
        });

        it('should remove task from project tasks when task is deleted', async () => {
            const { username, password } = data.users[1];
            const task = data.tasks[0];
            const project = data.projects[0];

            await login(username, password);
            await request.delete(`${ROUTES.TASK.ROOT}/${task._id}`);

            const $project = await Project.findById(project._id);
            const isTaskIncluded = $project.tasks.includes(task._id);
            expect(isTaskIncluded).to.equal(false);
        });

        it('should remove task from parent task when child task is deleted', async () => {
            const { username, password } = data.users[1];
            const taskParent = data.tasks[0];
            const task = data.tasks[1];

            await login(username, password);
            await request.delete(`${ROUTES.TASK.ROOT}/${task._id}`);

            const $task = await Task.findById(taskParent._id);
            const isTaskIncluded = $task.tasks.includes(task._id);
            expect(isTaskIncluded).to.equal(false);
        });

        it('should not remove task when user is not a project member', async () => {
            const { username, password } = data.users[0];
            const task = data.tasks[0];

            await login(username, password);
            await request.delete(`${ROUTES.TASK.ROOT}/${task._id}`);

            const $task = await Task.findById(task._id);
            expect($task).to.be.ok;
        });
    });
});
