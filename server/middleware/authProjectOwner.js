const Project = require("../models/project");

async function authProjectOwner(req, res, next){
    try{
        const projectId = req.params.project_id;
        if(!projectId){
            throw "Required param not found";
        }

        const project = await Project.findOne({_id: projectId, owner: req.user._id});
        if(project){
            req.project = project;
            return next();
        } else {
            throw "Project not found";
        }
    } catch (err){
        res.status(400).send({err})
    }
}

module.exports = authProjectOwner;