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
  const { description, notes, project_id, completed } = req.body;
  if (
    !description ||
    !notes ||
    !project_id === req.params.id ||
    completed === undefined
  ) {
    res.status(400).json({ message: "missing required fields" });
  } else {
    next();
  }
}

module.exports = { validateActionId, validateAction };
