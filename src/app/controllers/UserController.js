const api = require("../services/ApiService.js");
const parse = require("parse-link-header");

class UserController {
  async index(req, res) {
    if (req.query.since && isNaN(req.query.since)) {
      return res.status(400).json({ message: "Since must be a number" });
    }

    try {
      const users = await api.get(
        `/users${req.query.since ? `${`?since=${req.query.since}`}` : ""}`
      );

      const links = parse(users.headers.link);

      for (const link in links) {
        if (links[link].since) {
          res.header(
            link,
            `http://localhost:3333/api/users?since=${links[link].since}`
          );
        }
      }

      return res.send(users.data);
    } catch (e) {
      if (e.response.status == 404) {
        return res.status(404).json({ message: "Not found" });
      }
      return res.status(400);
    }
  }

  async details(req, res) {
    try {
      const user = await api.get(`/users/${req.params.username}`);

      return res.send(user.data);
    } catch (e) {
      if (e.response.status == 404) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(400);
    }
  }

  async repos(req, res) {
    try {
      const repos = await api.get(
        `/users/${req.params.username}/repos${
          req.query.page ? `${`?page=${req.query.page}`}` : ""
        }`
      );

      const links = parse(repos.headers.link);

      for (const link in links) {
        res.header(
          link,
          `http://localhost:3333/api/users/${req.params.username}/repos?page=${links[link].page}`
        );
      }

      return res.send(repos.data);
    } catch (e) {
      if (e.response.status == 404) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(400);
    }
  }
}

module.exports = new UserController();
