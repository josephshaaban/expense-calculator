const jwt = require("jsonwebtoken");

// Load secret key from config file
const SECRET_KEY = process.env.SECRET_KEY || "secretOrPrivateKey";

const generateToken = (id) => {
  // Use JWT lib to generate token
  return jwt.sign({ id }, SECRET_KEY, { expiresIn: "100d" });
};

module.exports = generateToken;
