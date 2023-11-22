const User = require("../../models/User");
const generateToken = require("../../helpers/generateToken.js");

// Controller for registering instance for User model
const userRegisterCtrl = async (req, res, next) => {
  const { fullname, password, email } = req.body;
  try {
    // check if email exist
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(appErr("User Already Exists", 400));
    }

    //Create User
    const user = await User.create({
      fullname,
      email,
      password,
    });
    const token = generateToken(user);

    // Send the response
    res.json({
      status: "success",
      id: user._id,
      user,
      token,
    });
  } catch (error) {
    // Catching the error
    next(appErr(error.message, 500));
  }
};

// Update user instance controller
const userUpdateCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Check if email exists
    if (email) {
      const userFound = await User.findOne({ email });
      if (userFound) return next(appErr("Email already exists", 400));
    }

    // Find user by ID and UPDATE
    const user = await User.findByIdAndUpdate(req.user, req.body, {
      new: true,
      runValidators: true,
    });
    // Send the response
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    // Catching the error
    next(appErr(error.message, 500));
  }
};

// Delete user instance controller
const userDeleteCtrl = async (req, res) => {
  try {
    // Find user by ID and DELETE
    await User.findByIdAndDelete(req.user);
    // Send the response
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    // Catching the error
    next(appErr(error.message, 500));
  }
};

module.exports = {
  userRegisterCtrl,
  userDeleteCtrl,
  userUpdateCtrl,
};
