const express = require("express");
const router = express.Router();

const Actions = require("./actions-model");
const { validateActionId, validateAction } = require("./actions-middlware");
//middleware file is misspelled "middlware", for fear of failing tests I will not change it, but I wanted everyone to know.

router.get("/", (req, res) => {
  Actions.get().then((actions) => {
    res.json(actions);
  });
});

router.get("/:id", validateActionId, (req, res) => {
  res.json(req.action);
});

router.post("/", validateAction, (req, res, next) => {
  Actions.insert(req.body)
    .then((newAction) => {
      res.status(201).json(newAction);
    })
    .catch(next);
});

router.put("/:id", validateActionId, validateAction, (req, res, next) => {
  Actions.update(req.params.id, req.body)
    .then(() => {
      return Actions.get(req.params.id);
    })
    .then((action) => {
      res.json(action);
    })
    .catch(next);
});

router.delete("/:id", validateActionId, async (req, res, next) => {
  try {
    await Actions.remove(req.params.id);
    res.json(req.action);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
