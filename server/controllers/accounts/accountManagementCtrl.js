const Account = require("../../models/Account");

// Create account controller
const accountCreateCtrl = async (req, res, next) => {
  try {
    // Find the logged in user
    // Create the account
    // push the account into users accounts field
    // Resave the user
  } catch (error) {
    // Catching the error
  }
};

// Update account controller
const accountUpdateCtrl = async (req, res, next) => {
  try {
    // Find account by ID and then Update
    // Send the response
  } catch (error) {
    // Catching the error
  }
};

// Delete account controller
const accountDeleteCtrl = async (req, res, next) => {
  try {
    // Find account by ID and then DELETE
    // Send the response
  } catch (error) {
    // Catching the error
  }
};

module.exports = {
  accountCreateCtrl,
  accountDeleteCtrl,
  accountUpdateCtrl,
};
