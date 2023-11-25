const { Router } = require("express");

const {
  transactionCreateCtrl,
  transactionGetCtrl,
  transactionByIDCtrl,
  transactionDeleteCtrl,
  transactionUpdateCtrl,
  transactionSearchCtrl,
  getUserBalance,
  transactionExpenseDetailsCtrl,
  transactionIncomeDetailsCtrl,
} = require("../controllers/transactions/transactionCtrl");

// const {
//   getUserBalance,
//   transactionExpenseDetailsCtrl,
//   transactionIncomeDetailsCtrl,
// } = require("../controllers/transactions/calculationCtrl");

const isLoggedUser = require("../middlewares/isLoggedUser");

const transactionsRoute = Router();

// BASE_URL/transactions
transactionsRoute.post("/", isLoggedUser, transactionCreateCtrl);
// BASE_URL/transactions
transactionsRoute.get("/", isLoggedUser, transactionGetCtrl);
// BASE_URL/transactions/search/:ID
transactionsRoute.get("/search/:searchIn", isLoggedUser, transactionSearchCtrl);
// BASE_URL/transactions/:ID
transactionsRoute.delete("/:id", isLoggedUser, transactionDeleteCtrl);
// BASE_URL/transactions/:ID
transactionsRoute.patch("/:id", isLoggedUser, transactionUpdateCtrl);
// BASE_URL/transactions/balance
transactionsRoute.get("/balance", isLoggedUser, getUserBalance);
// BASE_URL/transactions/expense
transactionsRoute.get("/expense", isLoggedUser, transactionExpenseDetailsCtrl);
// BASE_URL/transactions/income
transactionsRoute.get("/income", isLoggedUser, transactionIncomeDetailsCtrl);

// BASE_URL/transactions/:ID
transactionsRoute.get("/:id", isLoggedUser, transactionByIDCtrl);

module.exports = transactionsRoute;
