import { expect } from 'chai';

import {
    request,
    data,
    seedUsers,
    seedTasks,
    seedProjects,
    db,
    ROUTES,
    setInvalidUserToken,
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

describe('project API', () => {
    describe('POST /api/projects', () => {
        const { username, password } = data.users[0];
        const project = data.projects[0];

        beforeEach(async () => {
            await seedUsers();
            await login(username, password);
        });

        it('should create project when all required info is presented and token is valid', async () => {
            await request.post(ROUTES.PROJECT.ROOT).send(project);
            const $project = await Project.findById(project._id);
            expect($project).to.be.ok;
        });

        it('should add user to owner and members when project is created', async () => {
            await request.post(ROUTES.PROJECT.ROOT).send(project);
            const $project = await Project.findById(project._id);

            const { _id } = data.users[0];
            const isOwner = $project.owner == _id;
            const isMember = $project.members.includes(_id);
            expect(isOwner && isMember).to.equal(true);
        });

        it('should add project to user projects when project is created', async () => {
            await request.post(ROUTES.PROJECT.ROOT).send(project);

            const { _id } = data.users[0];
            const user = await User.findById(_id);
            const isProjectExist = user.projects.includes(project._id);
            expect(isProjectExist).to.equal(true);
        });

        it('should not create project when required info is not presented', async () => {
            const projectd = { ...project };
            delete projectd.title;
            await request.post(ROUTES.PROJECT.ROOT).send(projectd);
            const $project = await Project.findById(projectd._id);
            expect($project).to.not.be.ok;
        });

        it('should not add project to user projects when project wasnt created', async () => {
            const project = { ...project };
            delete project.title;
            await request.post(ROUTES.PROJECT.ROOT).send(project);
            const user = await User.findById(data.users[0]._id);
            const isProjectExist = user.projects.includes(project._id);
            expect(isProjectExist).to.equal(false);
        });

        it('should return project when its created', async () => {
            const res = await request.post(ROUTES.PROJECT.ROOT).send(project);
            expect(res.body.project.title).to.equal(project.title);
        });
    });

    describe('GET /api/projects', () => {
        const { username, password, projects } = data.users[1];

        beforeEach(async () => {
            await seedUsers();
            await seedProjects();
            await login(username, password);
        });

        it('should get all user projects when valid token is presented', async () => {
            const res = await request.get(ROUTES.PROJECT.ROOT);
            const resProjectIds = res.body.projects.map(project => project._id);
            const userProjectIds = projects.map(project => project.toString());
            const isAllProject = userProjectIds.every(projectId =>
                resProjectIds.includes(projectId)
            );
            expect(isAllProject).to.equal(true);
        });

        it('should not get any projects when invalid token is presented', async () => {
            setInvalidUserToken();
            const res = await request.get(ROUTES.PROJECT.ROOT);
            expect(res.body.projects).to.not.be.ok;
        });
    });

    describe('GET /api/projects/:project_id', () => {
        const project = data.projects[0];

        beforeEach(async () => {
            await seedUsers();
            await seedProjects();
            await seedTasks();
        });

        it('should get project when user has access to the project', async () => {
            const { username, password } = data.users[1];

            await login(username, password);
            const res = await request.get(
                `${ROUTES.PROJECT.ROOT}/${project._id}`
            );
            expect(res.body.project._id).to.equal(project._id);
        });

        it('should not get project when user doesnt have access to the project', async () => {
            const { username, password } = data.users[0];

            await login(username, password);
            const res = await request.get(
                `${ROUTES.PROJECT.ROOT}/${project._id}`
            );
            expect(res.body.project).to.not.be.ok;
        });

        it('should not return any project when project does not exist', async () => {
            const { username, password } = data.users[1];

            await login(username, password);
            const res = await request.get(`${ROUTES.PROJECT.ROOT}/1111111`);
            expect(res.body.project).to.not.be.ok;
        });
    });

    describe('PATCH /api/projects/:project_id', () => {
        const project = data.projects[0];

        beforeEach(async () => {
            await seedUsers();
            await seedProjects();
        });

        it('should update project when user is owner and updates are valid', async () => {
            const { username, password } = data.users[1];
            const title = 'new';

            await login(username, password);
            await request
                .patch(`${ROUTES.PROJECT.ROOT}/${project._id}`)
                .send({ title });
            const $project = await Project.findById(project._id);
            expect($project.title).to.equal(title);
        });

        it('should not update project when user is not owner and updates are valid', async () => {
            const { username, password } = data.users[0];
            const title = 'new';

            await login(username, password);
            await request
                .patch(`${ROUTES.PROJECT.ROOT}/${project._id}`)
                .send({ title });
            const $project = await Project.findById(project._id);
            expect($project.title).to.not.equal(title);
        });

        it('should not update project when user is owner and updates are invalid', async () => {
            const { username, password } = data.users[1];
            const title = 'new';

            await login(username, password);
            await request
                .patch(`${ROUTES.PROJECT.ROOT}/${project._id}`)
                .send({ title, isValid: false });
            const $project = await Project.findById(project._id);
            expect($project.title).to.not.equal(title);
        });

        it('should return updated project when its updated', async () => {
            const { username, password } = data.users[1];
            const title = 'new';

            await login(username, password);
            const res = await request
                .patch(`${ROUTES.PROJECT.ROOT}/${project._id}`)
                .send({ title });

            expect(res.body.project.title).to.equal(title);
        });

        describe('owner change', () => {
            it('should change when user is an owner', async () => {
                const { username, password } = data.users[1];
                const member = data.users[2];

                await login(username, password);
                await request
                    .patch(`${ROUTES.PROJECT.ROOT}/${project._id}`)
                    .send({ owner: member._id });
                const $project = await Project.findById(project._id);
                expect($project.owner.toString()).to.equal(member._id);
            });

            it('should not change when user is not an owner', async () => {
                const { username, password, _id } = data.users[2];

                await login(username, password);
                await request
                    .patch(`${ROUTES.PROJECT.ROOT}/${project._id}`)
                    .send({ owner: _id });
                const $project = await Project.findById(project._id);
                expect($project.owner.toString()).to.not.equal(_id);
            });

            it('should not change owner when member does not exist', async () => {
                const { username, password } = data.users[1];
                const user = data.users[0];

                await login(username, password);
                await request
                    .patch(`${ROUTES.PROJECT.ROOT}/${project._id}`)
                    .send({ owner: user._id });
                const $project = await Project.findById(project._id);
                expect($project.owner.toString()).to.not.equal(user._id);
            });
        });
    });

    describe('DELETE /api/projects/:project_id', () => {
        const project = data.projects[0];

        beforeEach(async () => {
            await seedUsers();
            await seedProjects();
            await seedTasks();
        });

        it('should delete project when user is an owner', async () => {
            const { username, password } = data.users[1];

            await login(username, password);
            await request.delete(`${ROUTES.PROJECT.ROOT}/${project._id}`);
            const $project = await Project.findById(project._id);
            expect($project).to.not.be.ok;
        });

        it('should not delete project when user is not an owner', async () => {
            const { username, password } = data.users[2];

            await login(username, password);
            await request.delete(`${ROUTES.PROJECT.ROOT}/${project._id}`);
            const $project = await Project.findById(project._id);
            expect($project).to.be.ok;
        });

        it('should remove tasks when project is deleted', async () => {
            const { username, password } = data.users[1];

            await login(username, password);
            await request.delete(`${ROUTES.PROJECT.ROOT}/${project._id}`);
            const tasks = await Task.find({ project: project._id });
            expect(tasks.length).to.equal(0);
        });

        it('should remove project from members projects when project is deleted', async () => {
            const { username, password } = data.users[1];

            await login(username, password);
            await request.delete(`${ROUTES.PROJECT.ROOT}/${project._id}`);
            const users = await User.find({ projects: project._id });
            expect(users.length).to.equal(0);
        });
    });

    describe('POST /api/projects/:project_id/members', () => {
        const project = data.projects[0];

        beforeEach(async () => {
            await seedUsers();
            await seedProjects();
        });

        it('should add member to project when user is an owner', async () => {
            const { username, password } = data.users[1];
            const user = data.users[0];

            await login(username, password);
            await request
                .post(
                    `${ROUTES.PROJECT.ROOT}/${project._id}${ROUTES.PROJECT.MEMBERS}`
                )
                .send({ _id: user._id });
            const $project = await Project.findById(project._id);
            const isMember = $project.members.includes(user._id);
            expect(isMember).to.equal(true);
        });

        it('should add project to user projects when user was added', async () => {
            const { username, password } = data.users[1];
            const user = data.users[0];

            await login(username, password);
            await request
                .post(
                    `${ROUTES.PROJECT.ROOT}/${project._id}${ROUTES.PROJECT.MEMBERS}`
                )
                .send({ _id: user._id });

            const $user = await User.findById(user._id);
            expect($user.projects.includes(project._id)).to.equal(true);
        });

        it('should not add member to project when user is not an owner', async () => {
            const { username, password } = data.users[2];
            const user = data.users[0];

            await login(username, password);
            await request
                .post(
                    `${ROUTES.PROJECT.ROOT}/${project._id}${ROUTES.PROJECT.MEMBERS}`
                )
                .send({ _id: user._id });

            const $user = await User.findById(user._id);
            expect($user.projects.includes(project._id)).to.equal(false);
        });

        it('should not add member to project when user is a member', async () => {
            const { username, password } = data.users[1];
            const user = data.users[2];

            await login(username, password);
            const res = await request
                .post(
                    `${ROUTES.PROJECT.ROOT}/${project._id}${ROUTES.PROJECT.MEMBERS}`
                )
                .send({ _id: user._id });
            expect(res.body.project).to.not.be.ok;
        });

        it('should return updated project when member is updated', async () => {
            const { username, password } = data.users[1];
            const user = data.users[0];

            await login(username, password);
            const res = await request
                .post(
                    `${ROUTES.PROJECT.ROOT}/${project._id}${ROUTES.PROJECT.MEMBERS}`
                )
                .send({ _id: user._id });

            const memberIds = res.body.project.members.map(
                member => member._id
            );
            const isMember = memberIds.includes(user._id);
            expect(isMember).to.equal(true);
        });
    });

    describe('DELETE /api/projects/:project_id/members', () => {
        const project = data.projects[0];

        beforeEach(async () => {
            await seedUsers();
            await seedProjects();
        });

        it('should remove user from members when owner does it', async () => {
            const { username, password } = data.users[1];
            const user = data.users[2];

            await login(username, password);
            await request
                .delete(
                    `${ROUTES.PROJECT.ROOT}/${project._id}${ROUTES.PROJECT.MEMBERS}`
                )
                .send({ _id: user._id });
            const $project = await Project.findById(project._id);
            const isMember = $project.members.includes(user._id);
            expect(isMember).to.equal(false);
        });

        it('should remove user from members when same user does it', async () => {
            const { username, password, _id } = data.users[2];

            await login(username, password);
            await request
                .delete(
                    `${ROUTES.PROJECT.ROOT}/${project._id}${ROUTES.PROJECT.MEMBERS}`
                )
                .send({ _id });
            const $project = await Project.findById(project._id);
            const isMember = $project.members.includes(_id);
            expect(isMember).to.equal(false);
        });

        it('should not remove owner from members', async () => {
            const { username, password, _id } = data.users[1];

            await login(username, password);
            await request
                .delete(
                    `${ROUTES.PROJECT.ROOT}/${project._id}${ROUTES.PROJECT.MEMBERS}`
                )
                .send({ _id });
            const $project = await Project.findById(project._id);
            const isMember = $project.members.includes(_id);
            expect(isMember).to.equal(true);
        });

        it('should not remove user from members when other member does it', async () => {
            const { username, password } = data.users[2];
            const user = data.users[1];

            await login(username, password);
            await request
                .delete(
                    `${ROUTES.PROJECT.ROOT}/${project._id}${ROUTES.PROJECT.MEMBERS}`
                )
                .send({ _id: user._id });
            const $project = await Project.findById(project._id);
            const isMember = $project.members.includes(user._id);
            expect(isMember).to.equal(true);
        });

        it('should return error when user doesnt exist', async () => {
            const { username, password } = data.users[1];

            await login(username, password);
            const res = await request
                .delete(
                    `${ROUTES.PROJECT.ROOT}/${project._id}${ROUTES.PROJECT.MEMBERS}`
                )
                .send({ _id: '111111' });
            expect(res.body.project).to.not.be.ok;
        });

        it('should return updated project when member is removed', async () => {
            const { username, password } = data.users[1];
            const user = data.users[2];

            await login(username, password);
            const res = await request
                .delete(
                    `${ROUTES.PROJECT.ROOT}/${project._id}${ROUTES.PROJECT.MEMBERS}`
                )
                .send({ _id: user._id });

            const memberIds = res.body.project.members.map(
                member => member._id
            );
            const isMember = memberIds.includes(user._id);
            expect(isMember).to.equal(false);
        });
    });

    describe('POST /api/projects/:project_id/tasks?parent', () => {
        const project = data.projects[0];
        const task = data.tasks[0];

        beforeEach(async () => {
            await seedUsers();
            await seedProjects();
        });

        describe('add task to project', () => {
            it('should create task when project exists and user is an owner', async () => {
                const { username, password } = data.users[1];

                await login(username, password);
                await request
                    .post(
                        `${ROUTES.PROJECT.ROOT}/${project._id}${ROUTES.PROJECT.TASKS}`
                    )
                    .send(task);
                const $task = await Task.findById(task._id);
                expect($task).to.be.ok;
            });

            it('should create task when project exists and user is a member', async () => {
                const { username, password } = data.users[2];

                await login(username, password);
                await request
                    .post(
                        `${ROUTES.PROJECT.ROOT}/${project._id}${ROUTES.PROJECT.TASKS}`
                    )
                    .send(task);
                const $task = await Task.findById(task._id);
                expect($task).to.be.ok;
            });

            it('should not create task when project exists and user is not a member', async () => {
                const { username, password } = data.users[0];

                await login(username, password);
                await request
                    .post(
                        `${ROUTES.PROJECT.ROOT}/${project._id}${ROUTES.PROJECT.TASKS}`
                    )
                    .send(task);
                const $task = await Task.findById(task._id);
                expect($task).to.not.be.ok;
            });

            it('should add task into project tasks when task is created', async () => {
                const { username, password } = data.users[1];

                await login(username, password);
                await Project.findByIdAndUpdate(project._id, {
                    $pull: { tasks: task._id },
                });
                await request
                    .post(
                        `${ROUTES.PROJECT.ROOT}/${project._id}${ROUTES.PROJECT.TASKS}`
                    )
                    .send(task);
                const $project = await Project.findById(project._id);
                expect($project.tasks.includes(task._id)).to.equal(true);
            });

            it('should return task when task is created', async () => {
                const { username, password } = data.users[1];

                await login(username, password);
                const res = await request
                    .post(
                        `${ROUTES.PROJECT.ROOT}/${project._id}${ROUTES.PROJECT.TASKS}`
                    )
                    .send(task);

                expect(res.body.task.title).to.equal(task.title);
            });
        });

        describe('add task to task', () => {
            const task1 = data.tasks[1];

            beforeEach(async () => {
                const { username, password } = data.users[2];
                await login(username, password);
                await request
                    .post(
                        `${ROUTES.PROJECT.ROOT}/${project._id}${ROUTES.PROJECT.TASKS}`
                    )
                    .send(task);
            });

            it('should create task when parent task exists and user is a member', async () => {
                await request
                    .post(
                        `${ROUTES.PROJECT.ROOT}/${project._id}${ROUTES.PROJECT.TASKS}?parent=${task._id}`
                    )
                    .send(task1);
                const $task = await Task.findById(task1._id);
                expect($task).to.be.ok;
            });

            it('should add task to parent task when task is created', async () => {
                await Task.findByIdAndUpdate(task._id, {
                    $pull: { tasks: task1._id },
                });
                await request
                    .post(
                        `${ROUTES.PROJECT.ROOT}/${project._id}${ROUTES.PROJECT.TASKS}?parent=${task._id}`
                    )
                    .send(task1);
                const $task = await Task.findById(task._id);

                const isTaskIncluded = $task.tasks.includes(task1._id);
                expect(isTaskIncluded).to.equal(true);
            });

            it('should return task when its created', async () => {
                const res = await request
                    .post(
                        `${ROUTES.PROJECT.ROOT}/${project._id}${ROUTES.PROJECT.TASKS}?parent=${task._id}`
                    )
                    .send(task1);
                expect(res.body.task.title).to.equal(task1.title);
            });
        });
    });
});
