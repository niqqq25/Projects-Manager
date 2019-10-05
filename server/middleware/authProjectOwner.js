const Project = require("../models/project");

async function authProjectOwner(req, res, next){
    try{
        const project = await Project.findOne({_id: req.params.id, owner: req.user._id});
        if(project){
            req.project = project;
            return next();
        } else {
            throw new Error();
        }
    } catch (err){
        res.status(400).send({message: "Project not found"})
    }
}

module.exports = authProjectOwner;