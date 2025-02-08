// Needed Resources
const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities");
const accValidate = require("../utilities/account-validation");

router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(accountController.defaultAccountView)
);
router.get("/login", utilities.handleErrors(accountController.buildLogin));
router.get(
  "/register",
  utilities.handleErrors(accountController.buildRegister)
);
router.get(
  "/update",
  utilities.handleErrors(accountController.viewUpdateAccount)
);
router.get("/logout", utilities.handleErrors(accountController.logout))

router.post(
  "/register",
  accValidate.registrationRules(),
  accValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);
// Process the login attempt
router.post(
  "/login",
  accValidate.loginRules(),
  accValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
);
router.post(
  "/update",
  accValidate.updateAccountRules(),
  accValidate.checkUpdateAccountData,
  utilities.handleErrors(accountController.updateAccount)
);
router.post(
  "/change-password",
  accValidate.updatePasswordRules(),
  accValidate.checkUpdatePasswordData,
  utilities.handleErrors(accountController.changePassword)
);

module.exports = router;
