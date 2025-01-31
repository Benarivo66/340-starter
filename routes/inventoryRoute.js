// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities");
const classValidate = require("../utilities/classification-validation");
const inventoryValidate = require("../utilities/inventory-validation");

router.get("/", utilities.handleErrors(invController.vehicleManagement));
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
);
router.get(
  "/detail/:invId",
  utilities.handleErrors(invController.buildByInventoryId)
);
router.get(
  "/add-classification",
  utilities.handleErrors(invController.addClassificationView)
);
router.post(
  "/add-classification",
  classValidate.classificationRules(),
  classValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
);
router.get(
    "/add-inventory",
    utilities.handleErrors(invController.addInventoryView)
)
router.post(
    "/add-inventory",
    inventoryValidate.inventoryRules(),
    inventoryValidate.checkInventoryData,
    utilities.handleErrors(invController.addInventory)
)

module.exports = router;
