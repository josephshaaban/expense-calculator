const jwt = require("jsonwebtoken");

// Load secret key from config file
const SECRET_KEY = process.env.SECRET_KEY || "secretOrPrivateKey";

const verifyToken = (token) => {
  // return callback function holds the user
  // decoded value of JWT is the user signed in
  return jwt.verify(token, SECRET_KEY, (error, decoded) => {
    if (error) {
      return false;
    } else {
      return decoded;
    }
  });
};

module.exports = verifyToken;
