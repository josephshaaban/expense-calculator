const Transaction = require("../../models/Transaction");
const {
  transactionCreateCtrl,
  transactionUpdateCtrl,
  transactionDeleteCtrl,
} = require("./transactionManagementCtrl");

// Get all transaction controller
const transactionGetCtrl = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    // Server Error
    res.status(500).json({
      success: false,
      data: null,
      message: err.message,
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
      message: err.message,
    });
  }
};

module.exports = {
  transactionGetCtrl,
  transactionByIDCtrl,
  transactionCreateCtrl,
  transactionUpdateCtrl,
  transactionDeleteCtrl,
};
