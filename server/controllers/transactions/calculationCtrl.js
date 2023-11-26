const user = require("../../models/User");
const Transaction = require("../../models/Transaction");

// Get user balance, Income, Expense
const getUserBalance = async (req, res, next) => {
  try {
    console.log("start");
    const transactions = await Transaction.find({ createdBy: req.user._id });

    let income = 0;
    let expense = 0;
    transactions.map((it) => {
      if (it.transactionType == "Income") {
        income += it.amount;
      } else {
        expense += it.amount;
      }
    });

    let balance = income - expense;
    const total = {
      income: income,
      expenses: expense,
      balance: balance,
    };

    res.status(200).json({ success: true, data: total });
  } catch (error) {
    // Server Error
    res.status(500).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};

// Get user Expense details by Category
const transactionExpenseDetailsCtrl = async (req, res, next) => {
  try {
    var amounts = {
      food: 0,
      transportation: 0,
      entertainment: 0,
      shopping: 0,
      utilities: 0,
      health: 0,
      travel: 0,
      education: 0,
      personal: 0,
      groceries: 0,
      bills: 0,
      uncategorized: 0,
    };

    const transactions = await Transaction.find({
      createdBy: req.user._id,
      transactionType: "Expense",
    });

    transactions.map((it) => {
      if (it.category == "Food") {
        amounts.food += it.amount;
      } else if (it.category == "Transportation") {
        amounts.transportation += it.amount;
      } else if (it.category == "entertainment") {
        amounts.entertainment += it.amount;
      } else if (it.category == "Shopping") {
        amounts.shopping += it.amount;
      } else if (it.category == "Utilities") {
        amounts.utilities += it.amount;
      } else if (it.category == "Health") {
        amounts.health += it.amount;
      } else if (it.category == "Travel") {
        amounts.travel += it.amount;
      } else if (it.category == "Education") {
        amounts.education += it.amount;
      } else if (it.category == "Personal") {
        amounts.personal += it.amount;
      } else if (it.category == "Groceries") {
        amounts.groceries += it.amount;
      } else if (it.category == "Bills") {
        amounts.bills += it.amount;
      } else if (it.category == "Uncategorized") {
        amounts.uncategorized += it.amount;
      }
    });

    res.status(200).json({ success: true, data: amounts });
  } catch (error) {
    // Server Error
    res.status(500).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};

// Get user Income details by Category
const transactionIncomeDetailsCtrl = async (req, res, next) => {
  try {
    var amounts = { salary: 0, uncategorized: 0 };

    const transactions = await Transaction.find({
      createdBy: req.user._id,
      transactionType: "Income",
    });

    transactions.map((it) => {
      if (it.category == "Salary") {
        amounts.salary += it.amount;
      } else if (it.category == "Uncategorized") {
        amounts.uncategorized += it.amount;
      }
    });

    res.status(200).json({ success: true, data: amounts });
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
  getUserBalance,
  transactionExpenseDetailsCtrl,
  transactionIncomeDetailsCtrl,
};
