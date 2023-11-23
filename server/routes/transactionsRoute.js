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
transactionsRoute.get("/", isLoggedUser, transactionGetCtrl);
// BASE_URL/transactions/:ID
transactionsRoute.get("/:id", isLoggedUser, transactionByIDCtrl);
// BASE_URL/transactions/:ID
transactionsRoute.delete("/:id", isLoggedUser, transactionDeleteCtrl);
// BASE_URL/transactions/:ID
transactionsRoute.patch("/:id", isLoggedUser, transactionUpdateCtrl);

module.exports = transactionsRoute;
