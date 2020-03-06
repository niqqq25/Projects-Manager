import Project from "../models/project";

async function authProjectOwner(req, res, next) {
    const projectId = req.params.project_id;

    try {
        if (!projectId) {
            throw new Error("Required param not found");
        }

        const project = await Project.findOne({
            _id: projectId,
            owner: req.user._id
        });
        if (!project) {
            throw new Error("Project not found");
        }

        req.project = project;
        return next();
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

export default authProjectOwner;
