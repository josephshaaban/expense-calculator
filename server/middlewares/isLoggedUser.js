const { appErr } = require("../helpers/appErr");
const getTokenFromHeader = require("../helpers/getTokenFromHeader");
const verifyToken = require("../helpers/verifyToken");

const isLoggedUser = (req, res, next) => {
  // Get token from req header
  const token = getTokenFromHeader(req);
  // Verify token
  const decodedUser = verifyToken(token);
  // save the user into req object
  req.user = decodedUser.id;
  if (!decodedUser) {
    return next(appErr("Invalid/Expired Token, Please Login again", 401));
  }
  next();
};

module.exports = isLoggedUser;
