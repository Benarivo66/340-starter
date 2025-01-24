// Needed Resources 
const express = require("express")
const router = new express.Router() 
const intErrController = require("../controllers/intErrController")
const utilities = require("../utilities")

router.get("errors/intentionalError", utilities.handleErrors(intErrController.getIntentionalError));


module.exports = router;