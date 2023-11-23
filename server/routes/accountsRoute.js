const { Router } = require("express");
const {
  accountCreateCtrl,
  accountByIDCtrl,
  accountDeleteCtrl,
  accountUpdateCtrl,
  accountGetAllCtrl,
} = require("../controllers/accounts/accountCtrl");
const isLoggedUser = require("../middlewares/isLoggedUser");

const accountsRoute = Router();

// BASE_URL/accounts
accountsRoute.post("/", isLoggedUser, accountCreateCtrl);
// BASE_URL/accounts/:ID
accountsRoute.get("/:id", isLoggedUser, accountByIDCtrl);
// BASE_URL/accounts/
accountsRoute.get("/", isLoggedUser, accountGetAllCtrl);
// BASE_URL/accounts/:ID
accountsRoute.delete("/:id", isLoggedUser, accountDeleteCtrl);
// BASE_URL/accounts/:ID
accountsRoute.patch("/:id", isLoggedUser, accountUpdateCtrl);

module.exports = accountsRoute;
