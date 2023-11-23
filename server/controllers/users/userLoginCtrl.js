const bcrypt = require("bcrypt");

const User = require("../../models/User");
const generateToken = require("../../helpers/generateToken.js");

// User login controller
const userLoginCtrl = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    // Check if email/user exists
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({
        success: false,
        result: null,
        message: "No account with this email has been registered.",
      });

    // check for password validity
    const correctPw = await bcrypt.compare(password, user.password);
    if (!correctPw)
      return res.status(400).json({
        success: false,
        result: null,
        message: "Invalid credentials.",
      });

    const token = generateToken(user);
    const result = await User.findOneAndUpdate(
      { _id: user._id },
      { isLoggedIn: true },
      {
        new: true,
      },
    ).exec();

    // Send the response
    res.json({
      success: true,
      result: {
        token,
        user: {
          _id: result._id,
          id: result._id,
          name: result.name,
          isLoggedIn: result.isLoggedIn,
        },
      },
      message: "Successfully login user",
    });
  } catch (err) {
    // Catching server error
    res
      .status(500)
      .json({ success: false, result: null, message: err.message });
  }
};

module.exports = { userLoginCtrl };
