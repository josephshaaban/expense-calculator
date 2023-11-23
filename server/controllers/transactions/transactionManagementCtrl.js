const User = require("../../models/User");
const Account = require("../../models/Account");
const Transaction = require("../../models/Transaction");

// Create transaction controller
const transactionCreateCtrl = async (req, res, next) => {
  const { name, amount, notes, transactionType, account, category } = req.body;
  try {
    // Find the logged in user
    const userFound = await User.findById(req.user._id);
    if (!userFound)
      return res.status(404).json({
        success: false,
        data: null,
        message: "No user found by this id: " + req.user._id,
      });

    // Find the account
    const accountFound = await Account.findById(account);
    if (!accountFound)
      return res.status(404).json({
        success: false,
        data: null,
        message: "No Account found for this user",
      });

    // Create the transaction
    const newTransaction = new Transaction({
      amount,
      notes,
      account,
      transactionType,
      category,
      name,
      createdBy: req.user._id,
    });
    const savedTransaction = newTransaction.save();

    // Push the transaction to the account
    accountFound.transactions.push(savedTransaction._id);
    // Resave the account and send the response
    await accountFound.save();

    res.status(200).send({
      success: true,
      data: savedTransaction,
    });
  } catch (error) {
    // Server Error
    res.status(500).json({
      success: false,
      data: null,
      message: err.message,
    });
  }
};

// Update transaction controller
const transactionUpdateCtrl = async (req, res, next) => {
  try {
    // Find transaction and then update
    const { id } = req.params;
    const result = await Transaction.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).exec();

    // If no results found, return transaction not found
    if (!result) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "No transaction found by this id: " + id,
      });
    } else {
      return res.status(200).json({
        success: true,
        data: result,
        message: "Successfully Updated the transaction by id: " + id,
      });
    }
  } catch (error) {
    // Server Error
    res.status(500).json({
      success: false,
      data: null,
      message: err.message,
    });
  }
};

// Delete transaction controller
const transactionDeleteCtrl = async (req, res, next) => {
  try {
    // Find transaction and then delete
    const { id } = req.params;
    const result = await Transaction.findByIdAndDelete(id).exec();

    // If no results found, return transaction not found
    if (!result) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "No transaction found by this id: " + id,
      });
    } else {
      return res.status(200).json({
        success: true,
        data: result,
        message: "Successfully Deleted the transaction by id: " + id,
      });
    }
  } catch (error) {
    // Server Error
    res.status(500).json({
      success: false,
      data: null,
      message: err.message,
    });
  }
};

module.exports = {
  transactionCreateCtrl,
  transactionDeleteCtrl,
  transactionUpdateCtrl,
};
