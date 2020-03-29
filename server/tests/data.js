import mongodb from 'mongodb';
const ObjectID = mongodb.ObjectID;

/*
SCHEMA
users:
1. not member of any projects
2. owner of the first project
3. member of the first project
projects:
1. project, which has owner as second user, member as third user and task as first task
tasks:
1. task of the first project
2. task of the first task
*/

const users = [
    //simple user
    {
        _id: 'bdbdf88028e375d81dccee42',
        fullName: 'Tomas second',
        email: 'tomas@email.com',
        username: 'tomas',
        password: 'admin0',
    },
    //owner
    {
        _id: '915db99d709ad3f495fead58',
        fullName: 'Bob second',
        email: 'bob@email.com',
        username: 'bob',
        password: 'admin01',
        projects: [ObjectID('3a6017b2a53544da7243ccc7')],
    },
    //project member
    {
        _id: 'b091c07a22700ebc58fe3008',
        fullName: 'Andrew second',
        email: 'andrew@email.com',
        username: 'andrew',
        password: 'admin02',
        projects: [ObjectID('3a6017b2a53544da7243ccc7')],
    },
];

const projects = [
    {
        _id: '3a6017b2a53544da7243ccc7',
        title: 'Project',
        owner: ObjectID('915db99d709ad3f495fead58'),
        members: [
            ObjectID('b091c07a22700ebc58fe3008'),
            ObjectID('915db99d709ad3f495fead58'),
        ],
        tasks: [ObjectID('09dae8175b197ef2a7cd2700')],
    },
];

const tasks = [
    {
        _id: '09dae8175b197ef2a7cd2700',
        title: 'Task',
        description: 'This is task',
        project: ObjectID('3a6017b2a53544da7243ccc7'),
        assignee: ObjectID('b091c07a22700ebc58fe3008'),
        tasks: [ObjectID('09dae8175b197ef2a7cd2701')],
    },
    {
        _id: '09dae8175b197ef2a7cd2701',
        title: 'Task in task',
        description: 'This is task',
        parentTask: ObjectID('09dae8175b197ef2a7cd2700'),
        project: ObjectID('3a6017b2a53544da7243ccc7'),
    },
];

export default { users, projects, tasks };
