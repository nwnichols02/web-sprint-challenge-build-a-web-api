// Write your "projects" router here!
const express = require("express");

//import middleware functions

const Projects = require('../projects/projects-model');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
        .then((projects) => {
            res.status(200).json(projects);
        })
        .catch(err => {
            console.log('im broken dummy')
        })
})

// router.get('/:id', (req, res, next) => {
//     Project.get(req.params.id, req.body)
//         .then((projects) => {
//             if(projects){
//                 res.status(200).json(projects)
//             } else {
//                 res.status(404).json({message: "The project with the specified ID does not exist"})
//             }
//         })
//         .catch(next)
// })

module.exports = router;