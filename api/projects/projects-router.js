// Write your "projects" router here!
const express = require("express");
const router = express.Router();

//import middleware functions
const Projects = require("./projects-model");
const {
  validateProjectId,
  validateProject,
  validateUpdatedProject,
} = require("./projects-middleware");

router.get("/", (req, res) => {
  Projects.get().then((projects) => {
    res.json(projects);
  });
});

router.get("/:id", validateProjectId, (req, res) => {
  res.json(req.project);
});

router.post("/", validateProject, (req, res, next) => {
  Projects.insert(req.body)
    .then((newProject) => {
      res.status(201).json(newProject);
    })
    .catch(next);
});

router.put(
  "/:id",
  validateProjectId,
  validateUpdatedProject,
  (req, res, next) => {
    Projects.update(req.params.id, req.body)
      .then(() => {
        return Projects.get(req.params.id);
      })
      .then((project) => {
        res.json(project);
      })
      .catch(next);
  }
);

router.delete("/:id", validateProjectId, async (req, res, next) => {
  try {
    await Projects.remove(req.params.id);
    res.json(req.project);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/actions", validateProjectId, async (req, res, next) => {
  try {
    const result = await Projects.getProjectActions(req.params.id);
    return res.json(result);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: "something went wrong",
    error: err.message,
  });
});

module.exports = router;
