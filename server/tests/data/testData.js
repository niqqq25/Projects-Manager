const ObjectID = require("mongodb").ObjectID;

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
        _id: new ObjectID("bdbdf88028e375d81dccee42"),
        firstname: "Tomas",
        secondname: "second",
        email: "tomas@email.com",
        phone: "202-555-0199",
        username: "tomas",
        password: "admin0"
    },
    //owner
    {
        _id: new ObjectID("915db99d709ad3f495fead58"),
        firstname: "Bob",
        secondname: "second",
        email: "bob@email.com",
        phone: "202-555-0199",
        username: "bob",
        password: "admin01",
        projects: [ObjectID("3a6017b2a53544da7243ccc7")]
    },
    //project member
    {
        _id: new ObjectID("b091c07a22700ebc58fe3008"),
        firstname: "Andrew",
        secondname: "second",
        email: "andrew@email.com",
        phone: "202-555-0199",
        username: "andrew",
        password: "admin02",
        projects: [ObjectID("3a6017b2a53544da7243ccc7")]
    }
];

const projects = [
    {
        _id: new ObjectID("3a6017b2a53544da7243ccc7"),
        title: "Project",
        owner: ObjectID("915db99d709ad3f495fead58"),
        members: [
            ObjectID("b091c07a22700ebc58fe3008"),
            ObjectID("915db99d709ad3f495fead58")
        ],
        tasks: [ObjectID("09dae8175b197ef2a7cd2700")]
    }
];

const tasks = [
    //first project tasks
    {
        _id: new ObjectID("09dae8175b197ef2a7cd2700"),
        title: "Task",
        description: "This is task",
        project: ObjectID("3a6017b2a53544da7243ccc7"),
        assignee: ObjectID("b091c07a22700ebc58fe3008"),
        tasks: [ObjectID("09dae8175b197ef2a7cd2701")]
    },
    {
        _id: new ObjectID("09dae8175b197ef2a7cd2701"),
        title: "Task in task",
        description: "This is task",
        parentTask: ObjectID("09dae8175b197ef2a7cd2700"),
        project: ObjectID("3a6017b2a53544da7243ccc7")
    }
];

module.exports = { users, projects, tasks };
