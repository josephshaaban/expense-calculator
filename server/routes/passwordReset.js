const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Joi = require("joi");
const { Router } = require("express");

const User = require("../models/User");
const Token = require("../models/token");
const sendEmail = require("../helpers/sendEmail");

const router = Router();

const PORT = process.env.PORT || 9000;
const API_VERSION = process.env.API_VERSION || "v1";
const API_URI = process.env.API_URI || `/api/${API_VERSION}`;
const BASE_URL = process.env.BASE_URL || `localhost:${PORT}${API_URI}`;

router.post("/", async (req, res) => {
  try {
    const schema = Joi.object({ email: Joi.string().email().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user)
      return res.status(400).send("user with given email doesn't exist");

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }

    const link = `${BASE_URL}/password-reset/${user._id}/${token.token}`;
    await sendEmail(user.email, "Password reset", link);

    res.json({
      success: true,
      result: { link: link },
      message: "password reset link sent to your email account",
    });
  } catch (err) {
    // Catching server Error
    res.status(500).json({
      success: false,
      result: null,
      message: err.message,
    });
  }
});

router.post("/:userId/:token", async (req, res) => {
  try {
    const schema = Joi.object({ password: Joi.string().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.params.userId);
    if (!user)
      return res.status(400).json({
        success: false,
        result: null,
        message: "Invalid link or expired",
      });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token)
      return res.status(400).json({
        success: false,
        result: null,
        message: "Invalid link or expired",
      });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(req.body.password, salt);
    user.password = passwordHash;
    await user.save();
    await Token.deleteOne(token);

    res.json({
      success: true,
      message: "Password reset sucessfully.",
    });
  } catch (err) {
    // Catching server Error
    res.status(500).json({
      success: false,
      result: null,
      message: err.message,
    });
  }
});

module.exports = router;
