const jwt = require("jsonwebtoken");

// Load secret key from config file
const SECRET_KEY = process.env.SECRET_KEY || "secretOrPrivateKey";
const EXPIRATION = process.env.EXPIRATION || "2h";

const generateToken = (user) => {
  // Use JWT lib to generate token
  const { email, _id } = user;
  const payload = { email, _id };

  return jwt.sign({ data: payload }, SECRET_KEY, { expiresIn: EXPIRATION });
};

module.exports = generateToken;
