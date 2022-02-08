const jwt = require("jsonwebtoken");

const createJWTToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });
};

module.exports = createJWTToken;
