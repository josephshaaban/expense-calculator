const User = require("../../models/User");

// Controller for registering instance for User model
const userRegisterCtrl = async (req, res, next) => {
  try {
    // check if email exist

    // Hash the password

    //Create User

    // Send the response
      
  } catch (error) {
    // Catching the error

  }
};

// Update user instance controller
const userUpdateCtrl = async (req, res, next) => {
  try {
  // Check if email exists

  // Check if user updating the password

  // Find user by ID and UPDATE

  // Send the response
  
  } catch (error) {
    // Catching the error

  }
};

// Delete user instance controller
const userDeleteCtrl = async (req, res) => {
  try {
  // Find user by ID and DELETE

  // Send the response

  } catch (error) {
    // Catching the error

  }
};

module.exports = {
  userRegisterCtrl,
  userDeleteCtrl,
  userUpdateCtrl,
};