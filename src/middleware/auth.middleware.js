const jwt = require("jsonwebtoken");
const { UserModel } = require("../models");
module.exports = {
  user: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      console.log(err);
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  },

  admin: async (req, res, next) => {
    try {
      const user = await UserModel.findOne({
        _id: req.user.id
      });
      if (user.role !== "admin" && user.email === req.user.email) {
        // assuming you pass user info
        return res.status(403).json({
          status: "fail",
          message: "Unauthorized to access this route"
        });
      }
      next();
    } catch (error) {
      return res.status(400).json({ message: "Authentication failure!" });
    }
  }
};
