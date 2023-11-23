const jwt = require("jsonwebtoken");

// Load secret key from config file
const SECRET_KEY = process.env.SECRET_KEY || "secretOrPrivateKey";

const generateToken = (user) => {
  // Use JWT lib to generate token
  const { email, _id } = user;
  const payload = { email, _id };

  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
  });
};

module.exports = generateToken;
