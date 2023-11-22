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

// Hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password, salt);
  }

  next();
});

// Custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// User model
const User = model("User", userSchema);

module.exports = User;
