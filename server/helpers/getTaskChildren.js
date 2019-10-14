async function getTaskChildren(taskChilds) {
    const Task = require("../models/task");
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