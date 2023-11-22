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

  // Send the response
      
  } catch (error) {
    // Catching the error

  }
};

module.exports = {
  userRegisterCtrl,
  userLoginCtrl,
  userProfileCtrl,
  userDeleteCtrl,
  userUpdateCtrl,
};
