// Write your "projects" router here!
const express = require("express");

//import middleware functions
const Projects = require("./projects-model");
// const {validateProjectId} = require('./projects-middleware');
const router = express.Router();

router.get("/api/projects", (req, res, next) => {
  Projects.get()
    .then((projects) => {
        res.json(projects);
     })
     .catch(err => {
        console.log('SAD path')
        next()
     })
});

// router.get('/:id', validateProjectId, (req, res) => {
//     res.json(req.project)
// })

// router.use((err, req, res, next) => {
//     res.status(err.status || 500).json({
//         message: "something went wrong",
//         error: err.message        
//     })
// })

module.exports = router;
