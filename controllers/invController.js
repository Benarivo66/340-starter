const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });
};

invCont.buildByInventoryId = async function (req, res, next) {
  const inv_id = req.params.invId;
  const invData = await invModel.getInventoryById(inv_id);
  const singleInv = await utilities.buildSingleInventory(invData);
  let nav = await utilities.getNav();
  res.render("./inventory/detail", {
    title: `${invData.inv_make}, ${invData.inv_model}`,
    nav,
    singleInv,
  });
};

invCont.vehicleManagement = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("./inventory/management", {
    title: "Vehicle Management",
    nav,
  });
};

invCont.addClassification = async function (req, res, next) {
  const { classification_name } = req.body;
  const result = await invModel.addClassification(classification_name);
  let nav = await utilities.getNav();
  if (result) {
    req.flash("notice", "New classification added successfully");
    res.status(201).render("inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null,
    });
  } else {
    req.flash("notice", "Sorry, addition of classification failed.");
    res.status(501).render("inventory/add-classification", {
      title: "Add New Classification",
      nav,
      errors: null,
    });
  }
};

invCont.addClassificationView = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
  });
};

invCont.addInventoryView = async function (req, res, next) {
  let nav = await utilities.getNav();
  const classificationList = await utilities.buildClassificationList();
  res.render("inventory/add-inventory", {
    title: "Add New Inventory",
    nav,
    errors: null,
    classificationList,
  });
};

invCont.addInventory = async function (req, res) {
  let nav = await utilities.getNav();
  let classificationList = await utilities.buildClassificationList();
  const {
    classification_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
  } = req.body;
  const result = await invModel.addInventory(
    classification_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
  );
  if (result) {
    req.flash("notice", "New inventory added successfully");
    res.status(201).render("inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null,
    });
  } else {
    req.flash("notice", "Sorry, addition of inventory failed.");
    res.status(501).render("inventory/add-inventory", {
      title: "Add New Inventory",
      nav,
      errors: null,
      classificationList
    });
  }
};

module.exports = invCont;
