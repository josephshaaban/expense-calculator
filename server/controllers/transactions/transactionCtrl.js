const Transaction = require("../../models/Transaction");
const {
  transactionCreateCtrl,
  transactionUpdateCtrl,
  transactionDeleteCtrl
} = require("./transactionManagementCtrl");

// Get all transaction controller
const transactionGetCtrl = async (req, res, next) => {
  try {
    const trans = await Transaction.find();
    res.status(200).json({ status: "success", data: trans });
  } catch (error) {
    // Server Error
    res.status(500).json({
      success: false,
      result: null,
      message: err.message,
    });
  }
};

// Get single transaction controller
const transactionByIDCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const trans = await Transaction.findById(id);
    res.json({ status: "success", data: trans });
  } catch (error) {
    // Server Error
    res.status(500).json({
      success: false,
      result: null,
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