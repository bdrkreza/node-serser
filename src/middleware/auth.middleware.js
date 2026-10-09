const jwt = require("jsonwebtoken");
const { UserModel } = require("../models");
module.exports = {
  user: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, { user }) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  },

  admin: async (req, res, next) => {
    try {
      const user = await UserModel.findById({ _id: req.user._id });
      if (user.role !== "admin") {
        // assuming you pass user info
        res.status(403).json({
          status: "fail",
          message: "Unauthorized to access this route"
        });
      }
      next();
    } catch (error) {
      res.status(400).json({ message: "Authentication failure!" });
    }
  }
};
