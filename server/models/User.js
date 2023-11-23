const bcrypt = require("bcrypt");
const { Schema, model } = require("mongoose");

// User schema
const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isLoggedIn: {
      type: Boolean,
    },
    hasCreatedAccount: {
      type: Boolean,
      default: false,
    },
    // user can have many accounts so using "Referencing"
    accounts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Account",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

// generating a hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(), null);
};

// Custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// User model
const User = model("User", userSchema);

module.exports = User;
