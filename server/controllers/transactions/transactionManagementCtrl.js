const Transaction = require("../../models/Transaction");

// Create transaction controller
const transactionCreateCtrl = async (req, res, next) => {
  const { name, amount, notes, transactionType, account, category } = req.body;
  try {
    // Find user

    // Find the account

    // Create the transaction

    // Push the transaction to the account

    // Resave the account and send the response

  } catch (error) {
    // Catching error
  }
};

// Update transaction controller
const transactionUpdateCtrl = async (req, res, next) => {
  try {
    // Find transaction and then update

    // send the response
  } catch (error) {
    // Catching error
  }
};

// Delete transaction controller
const transactionDeleteCtrl = async (req, res, next) => {
  try {
    // Find transaction and then delete

    // send the response
  } catch (error) {
    // Catching error
  }
};

module.exports = {
  transactionCreateCtrl,
  transactionDeleteCtrl,
  transactionUpdateCtrl,
};