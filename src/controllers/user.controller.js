const { UserModel } = require("../models");
const createJWTToken = require("../utils/generateToten");

module.exports = {
  register: async (req, res, next) => {
    const { username, email, role, password, image } = req.body;
    try {
      const userExists = await UserModel.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "The email Already exists." });
      }
      const newUser = new UserModel({
        username,
        email,
        role,
        password,
        image
      });
      const saveUser = await newUser.save();
      res.status(200).json({ status: true, data: saveUser, error: false });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "No user with this email!" });
      }

      const isValidPassword = await user.isValidPassword(password);
      if (!isValidPassword) {
        return res
          .status(400)
          .json({ message: "Incorrect email or password!" });
      }
      const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      };
      const access_token = createJWTToken(payload);
      return res.json({ token: access_token });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
