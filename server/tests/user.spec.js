import { expect } from 'chai';
import bcrypt from 'bcryptjs';

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

describe('user API', () => {
    describe('POST /api/users', () => {
        const user = data.users[0];

        it('should create user when required info is provided', async () => {
            await request.post(ROUTES.USER.ROOT).send(user);
            const $user = await User.findById(user._id);
            expect($user).to.be.ok;
        });

        it('should not create user when required info is not provided', async () => {
            const userData = Object.assign(user, { email: '' });
            await request.post(ROUTES.USER.ROOT).send(userData);
            const $user = await User.findById(user._id);
            expect($user).to.not.be.ok;
        });
    });

    describe('POST /api/users/login', () => {
        beforeEach(async () => {
            await seedUsers();
        });
        const { username, password } = data.users[0];

        it('should login user when credentials are correct', async () => {
            const res = await request
                .post(`${ROUTES.USER.ROOT}${ROUTES.USER.LOGIN}`)
                .send({
                    username,
                    password,
                });
            expect(res.status).to.equal(200);
        });

        it('should not login user when user doesnt exist', async () => {
            const res = await request
                .post(`${ROUTES.USER.ROOT}${ROUTES.USER.LOGIN}`)
                .send({
                    username: 'wrong',
                    password,
                });
            expect(res.status).to.not.equal(200);
        });

        it('should not login user when credentials are incorrect', async () => {
            const res = await request
                .post(`${ROUTES.USER.ROOT}${ROUTES.USER.LOGIN}`)
                .send({
                    username,
                    password: 'wrong',
                });
            expect(res.status).to.not.equal(200);
        });
    });

    describe('GET /api/users/me', () => {
        const { username, password } = data.users[0];

        beforeEach(async () => {
            await seedUsers();
            await login(username, password);
        });

        it('should return my info when valid token is presented', async () => {
            const res = await request.get(
                `${ROUTES.USER.ROOT}${ROUTES.USER.ME}`
            );
            const { user } = res.body;
            expect(user.username).to.equal(username);
        });
        it('should not return my info when token is not valid', async () => {
            setInvalidUserToken();
            const res = await request.get(
                `${ROUTES.USER.ROOT}${ROUTES.USER.ME}`
            );
            const { user } = res.body;
            expect(user).to.not.be.ok;
        });
    });

    describe('DELETE /api/users/me', () => {
        beforeEach(async () => {
            await seedUsers();
            await seedProjects();
            await seedTasks();
        });

        it('should delete me when valid token is presented', async () => {
            const { username, password, _id } = data.users[0];

            await login(username, password);
            await request.delete(`${ROUTES.USER.ROOT}${ROUTES.USER.ME}`);
            const user = await User.findById(_id);
            expect(user).to.not.be.ok;
        });

        it('should not delete me when I own a project', async () => {
            const { username, password } = data.users[1];

            await login(username, password);
            await request.delete(`${ROUTES.USER.ROOT}${ROUTES.USER.ME}`);
            const user = await User.findById(data.users[1]._id);
            expect(user).to.be.ok;
        });

        it('should remove me from projects when I am deleted', async () => {
            const { username, password, _id } = data.users[2];

            await login(username, password);
            await request.delete(`${ROUTES.USER.ROOT}${ROUTES.USER.ME}`);
            const projects = await Project.find({ members: _id });
            expect(projects.length).to.equal(0);
        });

        it('should remove me from assigned tasks when I am deleted', async () => {
            const { username, password, _id } = data.users[2];

            await login(username, password);
            await request.delete(`${ROUTES.USER.ROOT}${ROUTES.USER.ME}`);
            const tasks = await Task.find({ assignee: _id });
            expect(tasks.length).to.equal(0);
        });
    });

    describe('PATCH /api/users/me', () => {
        const { username, password, _id } = data.users[0];
        const fullName = 'Tobi';

        beforeEach(async () => {
            await seedUsers();
            await login(username, password);
        });

        it('should update me when all changes are valid', async () => {
            await request
                .patch(`${ROUTES.USER.ROOT}${ROUTES.USER.ME}`)
                .send({ fullName });
            const user = await User.findById(_id);
            
            const isNewFirsname = user.fullName === fullName;
            expect(isNewFirsname).to.equal(true);
        });

        it('should not update me when all changes are valid and token is not valid', async () => {
            setInvalidUserToken();
            await request
                .patch(`${ROUTES.USER.ROOT}${ROUTES.USER.ME}`)
                .send({ fullName });
            const user = await User.findById(_id);

            const isNewFirsname = user.fullName === fullName;
            expect(isNewFirsname).to.equal(false);
        });

        it('should not update me when changes are not valid', async () => {
            await request
                .patch(`${ROUTES.USER.ROOT}${ROUTES.USER.ME}`)
                .send({ fullName, email: 'top' });
            const user = await User.findById(_id);

            const isNewFirsname = user.fullName === fullName;
            expect(isNewFirsname).to.equal(false);
        });

        it('should update my password when its longer than 6', async () => {
            const password = 'LongerThan6';

            await request
                .patch(`${ROUTES.USER.ROOT}${ROUTES.USER.ME}`)
                .send({ password });
            const user = await User.findById(_id);

            const isNewPassword = await bcrypt.compare(password, user.password);
            expect(isNewPassword).to.equal(true);
        });

        it('should not update my password when its shorter than 6', async () => {
            const password = 'short';

            await request
                .patch(`${ROUTES.USER.ROOT}${ROUTES.USER.ME}`)
                .send({ password });
            const user = await User.findById(_id);

            const isNewPassword = await bcrypt.compare(password, user.password);
            expect(isNewPassword).to.equal(false);
        });

        it('should return updated me when I am updated', async () => {
            const res = await request
                .patch(`${ROUTES.USER.ROOT}${ROUTES.USER.ME}`)
                .send({ fullName });

            expect(res.body.user.fullName).to.equal(fullName);
        });
    });

    describe('GET /api/users/:id', () => {
        beforeEach(async () => {
            await seedUsers();
            const { username, password } = data.users[1];
            await login(username, password);
        });

        it('should return user when user id is valid', async () => {
            const { _id, username } = data.users[0];

            const res = await request.get(`${ROUTES.USER.ROOT}/${_id}`);
            expect(res.body.user.username).to.equal(username);
        });

        it('should return error when user doesnt exist', async () => {
            const res = await request.get(`${ROUTES.USER.ROOT}/11111`);
            expect(res.body.user).to.not.be.ok;
        });

        it('should not return user when user id is valid but token is not valid', async () => {
            setInvalidUserToken();
            const res = await request.get(
                `${ROUTES.USER.ROOT}/${data.users[0]._id}`
            );
            expect(res.body.user).to.not.be.ok;
        });
    });

    describe('GET /api/users', () => {
        beforeEach(async () => {
            const { username, password } = data.users[1];
            await seedUsers();
            await login(username, password);
        });

        it('should return all users when there is no quary params', async () => {
            const res = await request.get(ROUTES.USER.ROOT);
            expect(res.body.users.length).be.equal(data.users.length);
        });

        it('should return selected users when regex is provided', async () => {
            const regex = data.users[0].username.slice(0, 3);
            const res = await request.get(`${ROUTES.USER.ROOT}?regex=${regex}`);

            const usernames = res.body.users.map(user => user.username);
            const reg = new RegExp(regex, 'ig');

            expect(usernames.every(username => reg.test(username))).to.equal(
                true
            );
        });

        it('should return users which arent members of project when project id is provided and isMembers set to false', async () => {
            const { _id, members } = data.projects[0];

            const res = await request.get(
                `${ROUTES.USER.ROOT}?project=${_id}&isMembers=false`
            );
            const userIds = res.body.users.map(user => user._id);
            const isNotMembers = userIds.every(id => !members.includes(id));

            expect(isNotMembers).to.equal(true);
        });

        it('should return members of project when project id is provided', async () => {
            const { _id, members } = data.projects[0];

            const res = await request.get(`${ROUTES.USER.ROOT}?project=${_id}`);

            const userIds = res.body.users.map(user => user._id);
            const membersString = members.map(member => member.toString());
            const isMembers = userIds.every(id => membersString.includes(id));

            expect(isMembers).to.equal(true);
        });

        it('should return error when user does not exist in provided project', async () => {
            const { username, password } = data.users[0];

            await login(username, password);
            const res = await request.get(
                `${ROUTES.USER.ROOT}?project=${data.projects[0]._id}`
            );
            expect(res.body.users).to.not.be.ok;
        });
    });
});
