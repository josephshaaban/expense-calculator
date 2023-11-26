const { Schema, model } = require("mongoose");

// Transaction schema
const transactionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    transactionType: {
      type: String,
      enum: ["Income", "Expense"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Food",
        "Transportation",
        "Entertainment",
        "Shopping",
        "Utilities",
        "Health",
        "Travel",
        "Education",
        "Personal",
        "Groceries",
        "Bills",
        "Salary",
        "Allowance",
        "Commission",
        "Gifts",
        "Interests",
        "Investments",
        "Selling",
        "Uncategorized",
      ],
      required: true,
    },
    color: {
      type: String,
    },
    //transaction will created by a user so using "Referencing"
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
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

// Transaction model
const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;
