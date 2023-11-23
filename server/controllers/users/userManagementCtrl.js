const bcrypt = require("bcrypt");

const User = require("../../models/User");

// Controller for registering instance for User model
const userRegisterCtrl = async (req, res) => {
  try {
    let { email, password, passwordCheck, fullname } = req.body;
    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    if (!fullname) fullname = email;
    // Create User
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullname,
      email,
      password: passwordHash,
    });
    const savedUser = await newUser.save();

    // Send the response
    res.status(200).send({
      success: true,
      user: {
        _id: savedUser._id,
        email: savedUser.email,
        fullname: savedUser.fullname,
      },
    });
  } catch (err) {
    // Server Error
    res.status(500).json({
      success: false,
      result: null,
      message: err.message,
    });
  }
};

// Update user instance controller
const userUpdateCtrl = async (req, res) => {
  try {
    let { email } = req.body;

    if (email) {
      const existingUser = await User.findOne({ email: email });

      if (existingUser._id != req.user._id)
        return res
          .status(400)
          .json({ message: "An account with this email already exists." });
    }

    let updates = {
      email: req.body.email,
      fullname: req.body.fullname,
    };

    // Find user by id and updates with the required fields
    const result = await User.findOneAndUpdate(
      req.user,
      { $set: updates },
      {
        new: true, // return the new result instead of the old one
        runValidators: true,
      },
    ).exec();

    // Send the response
    if (!result) {
      return res.status(404).json({
        success: false,
        result: null,
        message: "No user found by this id: " + req.user._id,
      });
    }
    return res.status(200).json({
      success: true,
      result: {
        _id: result._id,
        email: result.email,
        fullname: result.fullname,
      },
      message: "we update this user by this id: " + req.user._id,
    });
  } catch (err) {
    // Server Error
    res.status(500).json({
      success: false,
      result: null,
      message: err.message,
    });
  }
};

// Delete user instance controller
// No meaning for deleting the own user instance in real life, expect we are
// applying some regulations like General Data Protection Regulation (EU GDPR)
const userDeleteCtrl = async (req, res) => {
  try {
    // Find user by ID and DELETE
    const result = await User.findOneAndDelete(req.user).exec();

    // If no results found, return user not found
    if (!result) {
      return res.status(404).json({
        success: false,
        result: null,
        message: "No user found by this id: " + req.user._id,
      });
    } else {
      return res.status(200).json({
        success: true,
        result,
        message: "Successfully Deleted the user by id: " + req.user._id,
      });
    }
  } catch (err) {
    // Server Error
    res.status(500).json({
      success: false,
      result: null,
      message: err.message,
    });
  }
};

module.exports = {
  userRegisterCtrl,
  userDeleteCtrl,
  userUpdateCtrl,
};
