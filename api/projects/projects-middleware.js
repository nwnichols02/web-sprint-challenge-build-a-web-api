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

module.exports = {validateProjectId}