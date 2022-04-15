// add middlewares here related to actions
const Actions = require("./actions-model");

function validateActionId(req, res, next) {
  Actions.get(req.params.id).then((action) => {
    if (action) {
      req.action = action;
      next();
    } else {
      res.status(404).json({ message: "action not found" });
    }
  });
}

function validateAction(req, res, next) {
  const { description, notes, project_id } = req.body;
  if (!description || !notes || !project_id === req.params.id) {
    res.status(400).json({ message: "missing required fields" });
  } else {
    // req.notes = name.trim();
    next();
  }
}

function validateUpdatedAction(req, res, next) {
  const { notes, description, project_id } = req.body;
  if (!notes || !description || !project_id === req.params.id) {
    res.status(400).json({ message: "missing required fields" });
  } else {
    // req.name = name.trim();
    next();
  }
}

module.exports = { validateActionId, validateAction, validateUpdatedAction };
