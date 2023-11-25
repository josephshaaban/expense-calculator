const Transaction = require("../../models/Transaction");
const user = require("../../models/User");
const account = require("../../models/Account");

const {
  transactionCreateCtrl,
  transactionUpdateCtrl,
  transactionDeleteCtrl,
} = require("./transactionManagementCtrl");

const {
  getUserBalance,
  transactionExpenseDetailsCtrl,
  transactionIncomeDetailsCtrl,
} = require("./calculationCtrl");

const Account = require("../../models/Account");

// Get all transaction controller
const transactionGetCtrl = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ createdBy: req.user._id });
    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    // Server Error
    res.status(500).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};

const transactionSearchCtrl = async (req, res, next) => {
  try {
    const { searchIn } = req.params;
    const { searchValue } = req.body;
    console.log(searchIn);
    console.log(searchValue);
    let transactions = [];
    if (searchIn == "date") {
      transactions = await Transaction.find({
        createdBy: req.user._id,
        date: { $regex: searchValue, $options: "i" },
      });
    } else if (searchIn == "notes") {
      transactions = await Transaction.find({
        createdBy: req.user._id,
        notes: { $regex: searchValue, $options: "i" },
      });
    } else if (searchIn == "category") {
      transactions = await Transaction.find({
        createdBy: req.user._id,
        category: { $regex: searchValue, $options: "i" },
      });
    } else {
      transactions = await Transaction.find({
        createdBy: req.user._id,
      });
    }

    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    // Server Error
    res.status(500).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};

// Get a single transaction controller
const transactionByIDCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);
    res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    // Server Error
    res.status(500).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};

module.exports = {
  transactionGetCtrl,
  transactionByIDCtrl,
  transactionCreateCtrl,
  transactionUpdateCtrl,
  transactionDeleteCtrl,
  transactionSearchCtrl,
  getUserBalance,
  transactionExpenseDetailsCtrl,
  transactionIncomeDetailsCtrl,
};
