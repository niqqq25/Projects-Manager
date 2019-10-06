const Task = require("../models/task");

async function getTaskChildren(taskChilds) {
    let tasksToCheck = [...taskChilds];
    const taskChildren = [];
    while (tasksToCheck.length > 0) {
        const tasks = await Task.find({
            _id: { $in: [...tasksToCheck] }
        });
        taskChildren.push(...tasksToCheck);
        tasksToCheck = [];

        tasks.forEach(task => {
            tasksToCheck.push(...task.tasks);
        });
    }
    return taskChildren;
}

module.exports = getTaskChildren;