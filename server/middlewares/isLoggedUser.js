const getTokenFromHeader = require("../helpers/getTokenFromHeader");
const verifyToken = require("../helpers/verifyToken");

const isLoggedUser = (req, res, next) => {
  let token, decodedUser;
  try {
    // Get token from req header
    token = getTokenFromHeader(req);
    // Verify token
    decodedUser = verifyToken(token);
    // save the user into req object
    req.user = {
      email: decodedUser.email,
      _id: decodedUser._id,
      id: decodedUser._id,
    };

    next();
  } catch (err) {
    if (!token || !decodedUser)
      res.status(401).json({
        success: false,
        data: null,
        message: "Invalid/Expired Token, Please Login again",
        jwtExpired: true,
      });
    else
      res.status(500).json({
        success: false,
        data: null,
        message: err.message,
        jwtExpired: true,
      });
  }
};

module.exports = isLoggedUser;
