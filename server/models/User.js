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
      required: true,
    },
    password: {
      type: String,
      required: true,
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

// User model
const User = model("User", userSchema);

module.exports = User;
