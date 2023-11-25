const Account = require("../../models/Account");

// Create account controller
const accountCreateCtrl = async (req, res, next) => {
  const { name, initialBalance, accountType, notes } = req.body;
  try {
    // Find the logged in user
    const userFound = await User.findById(req.user._id);
    if (!userFound)
      return res.status(404).json({
        success: false,
        data: null,
        message: "No user found by this id: " + req.user._id,
      });

    // Create the account
    const newAccount = new Account.create({
      name,
      initialBalance,
      accountType,
      notes,
      createdBy: req.user,
    });
    const savedAccount = newAccount.save();

    // push the account into users accounts field
    userFound.accounts.push(savedAccount._id);

    // Resave the user
    await userFound.save();

    res.status(200).send({
      success: true,
      data: savedAccount,
    });
  } catch (err) {
    // Server Error
    res.status(500).json({
      success: false,
      data: null,
      message: err.message,
    });
  }
};

// Update account controller
const accountUpdateCtrl = async (req, res, next) => {
  try {
    // Find account by ID and then Update
    const { id } = req.params;
    const account = await Account.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).exec();

    // If no results found, return account not found
    if (!account) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "No account found by this id: " + id,
      });
    } else {
      return res.status(200).json({
        success: true,
        data: account,
        message: "Successfully Updated the account by id: " + id,
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

// Delete account controller
const accountDeleteCtrl = async (req, res, next) => {
  try {
    // Find account by ID and then DELETE
    const { id } = req.params;
    const result = await Account.findByIdAndDelete(id).exec();

    // If no results found, return transaction not found
    if (!result) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "No account found by this id: " + id,
      });
    } else {
      return res.status(200).json({
        success: true,
        data: result,
        message: "Successfully Deleted the account by id: " + id,
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
  accountCreateCtrl,
  accountDeleteCtrl,
  accountUpdateCtrl,
};
