const { Schema, model } = require("mongoose");

// Account schema
const accountSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      enum: [
        "Savings",
        "Investments",
        "Checking",
        "Credit Card",
        "Building",
        "School",
        "Project",
        "Utilities",
        "Travel",
        "Personal",
        "Groceries",
        "Entertainment",
        "Loan",
        "Cash Flow",
        "Uncategorized",
      ],
      required: true,
    },
    initialBalance: {
      type: Number,
      default: 0,
    },
    // account can have many transaction so using "Referencing"
    transactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    notes: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

// Account model
const Account = model("Account", accountSchema);

module.exports = Account;
