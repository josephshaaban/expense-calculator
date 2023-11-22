const User = require("../../models/User");
const generateToken = require("../../helpers/generateToken.js");

// User login controller
const userLoginCtrl = async (req, res, next) => {
  try {
    // Check if email/user exists
    const user = await User.findOne({ email });
    if (!user) {
      return next(appErr("Invalid Login credentials", 400));
    }

    // check for password validity
    const correctPw = await user.isCorrectPassword(password);
    if (!correctPw) {
      return next(appErr("Invalid Login credentials", 400));
    }

    const token = generateToken(user._id);
    // Send the response
    res.json({
      status: "success",
      id: user._id,
      user,
      token,
    });
  } catch (error) {
    // Catching the error
    next(appErr(error.message, 500));
  }
};

module.exports = { userLoginCtrl };
