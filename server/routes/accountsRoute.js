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
accountsRoute.get("/:id", accountByIDCtrl);
// BASE_URL/accounts/
accountsRoute.get("/", accountGetAllCtrl);
// BASE_URL/accounts/:ID
accountsRoute.delete("/:id", accountDeleteCtrl);
// BASE_URL/accounts/:ID
accountsRoute.put("/:id", accountUpdateCtrl);

module.exports = accountsRoute;
