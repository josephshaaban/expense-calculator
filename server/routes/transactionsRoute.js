const { Router } = require("express");

const {
  transactionCreateCtrl,
  transactionGetCtrl,
  transactionByIDCtrl,
  transactionDeleteCtrl,
  transactionUpdateCtrl,
} = require("../controllers/transactions/transactionCtrl");
const isLoggedUser = require("../middlewares/isLoggedUser");

const transactionsRoute = Router();

// BASE_URL/transactions
transactionsRoute.post("/", isLoggedUser, transactionCreateCtrl);
// BASE_URL/transactions
transactionsRoute.get("/", transactionGetCtrl);
// BASE_URL/transactions/:ID
transactionsRoute.get("/:id", transactionByIDCtrl);
// BASE_URL/transactions/:ID
transactionsRoute.delete("/:id", transactionDeleteCtrl);
// BASE_URL/transactions/:ID
transactionsRoute.put("/:id", transactionUpdateCtrl);

module.exports = transactionsRoute;
