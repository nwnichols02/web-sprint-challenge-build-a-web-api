const express = require("express");
const projectsRouter = require("./projects/projects-router");
const actionRouter = require("./action/actions-router");

const server = express();

server.use(express.json());

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionRouter);

server.get("/", (req, res) => {
  res.send("<h1>am i really working tho??</h1>");
});

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
