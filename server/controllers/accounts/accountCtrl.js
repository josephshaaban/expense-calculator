const Account = require("../../models/Account");
const {
  accountCreateCtrl,
  accountUpdateCtrl,
  accountDeleteCtrl
} = require("./accountManagementCtrl")

// Get single account controller
const accountByIDCtrl = async (req, res, next) => {
  try {
    // Find and get the id from params
    
    // Send the response
  } catch (error) {
    // Catching error
  }
};

// Get all accounts controller
const accountGetAllCtrl = async (req, res, next) => {
  try {
    // Find and get all accounts
    
    // Send the response
  } catch (error) {
    // Catching error
  }
};

module.exports = {
  accountCreateCtrl,
  accountByIDCtrl,
  accountDeleteCtrl,
  accountUpdateCtrl,
  accountGetAllCtrl,
};