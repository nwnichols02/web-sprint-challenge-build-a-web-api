// add middlewares here related to projects
const Projects = require('./projects-model');

function validateProjectId(req, res, next){
    Projects.get(req.params.id)
        .then(project => {
            if(project){
                req.project = project
                next()
            } else {
                res.status(404).json({message: "project not found"})
            }
        })
}

function validateProject(req, res, next) {
    const {name, description} = req.body;
    if(!name || !description){
        res.status(400).json({message: "missing required fields"})
    } else {
        req.name = name.trim();
        next();
    }
}

function validateUpdatedProject (req, res, next) {
    const {name, description, completed} = req.body;
    if(!name || !description || completed === undefined){
        res.status(400).json({message: "missing required fields"})
    } else {
        req.name = name.trim();
        next();
    }
}

module.exports = {validateProjectId, validateProject, validateUpdatedProject}