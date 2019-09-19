const api = require("../services/ApiService.js");

class UserController {
  async index(req, res) {
    if (req.query.since && isNaN(req.query.since)) {
      return res.status(400).json({ message: "Since must be a number" });
    }

    try {
      const users = await api.get(
        `/users${req.query.since ? `${`?since=${req.query.since}`}` : ""}`
      );

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
      const user = await api.get(`/users/${req.params.username}/repos`);

      return res.send(user.data);
    } catch (e) {
      if (e.response.status == 404) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(400);
    }
  }
}

module.exports = new UserController();
