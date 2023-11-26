const User = require("../../models/User");
const Account = require("../../models/Account");
const Transaction = require("../../models/Transaction");

// Create transaction controller
const transactionCreateCtrl = async (req, res, next) => {
  const { name, amount, notes, transactionType, category } = req.body;

  try {
    // Find the logged in user
    const userFound = await User.findById(req.user._id);
    if (!userFound)
      return res.status(404).json({
        success: false,
        data: null,
        message: "No user found by this id: " + req.user._id,
      });

    // Create the transaction
    const newTransaction = new Transaction({
      amount: amount,
      notes: notes,
      transactionType: transactionType,
      category: category,
      name: name,
      createdBy: req.user._id,
    });
    const savedTransaction = await newTransaction.save();

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
