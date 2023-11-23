const User = require("../../models/User");
const { userLoginCtrl } = require("./userLoginCtrl");
const {
  userRegisterCtrl,
  userDeleteCtrl,
  userUpdateCtrl,
} = require("./userManagementCtrl");

// Get user profile controller
const userProfileCtrl = async (req, res) => {
  try {
    // Get user profile by user ID
    const user = await User.findById(req.user._id).populate({
      path: "accounts",
      populate: {
        path: "transactions",
        model: "Transaction",
      },
    });
    // Send the response
    res.json({
      success: true,
      result: user,
    });
  } catch (err) {
    // Catching server Error
    res.status(500).json({
      success: false,
      result: null,
      message: err.message,
    });
  }
};

module.exports = {
  userRegisterCtrl,
  userLoginCtrl,
  userProfileCtrl,
  userDeleteCtrl,
  userUpdateCtrl,
};
