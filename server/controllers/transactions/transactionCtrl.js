const Transaction = require("../../models/Transaction");
const user = require("../../models/User");
const account = require("../../models/Account");
const ObjectId = require("mongoose").Types.ObjectId;

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
    const { searchValue } = req.params;
    const userObjectId = new ObjectId(req.user._id);
    console.log(!req.params.searchIn, searchValue, userObjectId);
    let transactions = [];

    // Prepare searchValue for date search
    let dateParam = new Date(searchValue);
    let minDateParam = 0;
    let maxDateParam = 0;
    if (!isNaN(dateParam)) {
      minDateParam = dateParam - 82800000;
      maxDateParam = dateParam + 82800000;
    }

    if (!req.params.searchIn) {
      transactions = await Transaction.find({
        createdBy: userObjectId,
        $or: [
          { name: { $regex: searchValue, $options: "i" } },
          { category: { $regex: searchValue, $options: "i" } },
          { date: { $gte: minDateParam, $lt: maxDateParam } },
          { notes: { $regex: searchValue, $options: "i" } },
        ],
      })
        // .searchByText(searchValue)
        .exec();
      console.log(transactions);
    } else if (req.params.searchIn == "date") {
      transactions = await Transaction.find({
        createdBy: req.user._id,
        date: { $regex: searchValue, $options: "i" },
      });
    } else if (req.params.searchIn == "notes") {
      transactions = await Transaction.find({
        createdBy: req.user._id,
        notes: { $regex: searchValue, $options: "i" },
      });
    } else if (req.params.searchIn == "category") {
      transactions = await Transaction.find({
        createdBy: req.user._id,
        category: { $regex: searchValue, $options: "i" },
      });
    } else {
      transactions = [];
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
