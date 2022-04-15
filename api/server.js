const express = require("express");
const server = express();

const actionRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");

server.use(express.json());

server.use("/api/actions", actionRouter);
server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
  res.send(`<h1>"To work or not to work?" - Nate</h1><br><h2>Welcome to Nate's attempt to make the Sprint Challenge functional</h2>`);
});

module.exports = server;
