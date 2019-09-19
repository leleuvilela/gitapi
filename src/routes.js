const routes = require("express").Router();

const UserController = require("./app/controllers/UserController");

const authMiddleware = require("./app/middlewares/auth");

routes.get("/api/users", UserController.index);
routes.get("/api/users/:username/details", UserController.details);
routes.get("/api/users/:username/repos", UserController.repos);

module.exports = routes;
