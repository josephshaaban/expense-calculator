const { Router } = require("express");
const {
  userRegisterCtrl,
  userLoginCtrl,
  userProfileCtrl,
  userDeleteCtrl,
  userUpdateCtrl,
} = require("../controllers/users/userCtrl");
const isLoggedUser = require("../middlewares/isLoggedUser");

const usersRoute = Router();

// BASE_URL/users/register
usersRoute.post("/register", userRegisterCtrl);
// BASE_URL/users/login
usersRoute.post("/login", userLoginCtrl);
// BASE_URL/profile/
usersRoute.get("/profile/", isLoggedUser, userProfileCtrl);
// BASE_URL/users/
usersRoute.delete("/", isLoggedUser, userDeleteCtrl);
// BASE_URL/users/
usersRoute.patch("/", isLoggedUser, userUpdateCtrl);

module.exports = usersRoute;
