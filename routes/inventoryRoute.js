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
router.get(
  "/add-inventory",
  utilities.checkAccountType,
  utilities.handleErrors(invController.addInventoryView)
);
router.get(
  "/getInventory/:classification_id",
  utilities.handleErrors(invController.getInventoryJSON)
);
router.get(
  "/edit/:inv_id",
  utilities.handleErrors(invController.editInventoryView)
);
router.get(
  "/delete/:inv_id",
  utilities.handleErrors(invController.deleteInventoryView)
);

router.post(
  "/add-classification",
  utilities.checkAccountType,
  classValidate.classificationRules(),
  classValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
);
router.post(
  "/add-inventory",
  utilities.checkAccountType,
  inventoryValidate.inventoryRules(),
  inventoryValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
);
router.post(
  "/update/",
  utilities.checkAccountType,
  inventoryValidate.inventoryRules(),
  inventoryValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
);
router.post(
  "/delete/",
  utilities.checkAccountType,
  utilities.handleErrors(invController.deleteInventory)
);

module.exports = router;
