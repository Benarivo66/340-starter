const { body, validationResult } = require("express-validator");
const utilities = require(".")
const validate = {};

validate.inventoryRules = () => {
  return [
    body("inv_make")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a valid make."),

    body("inv_model")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a valid model."),

    body("inv_year")
      .trim()
      .notEmpty()
      .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
      .withMessage("Please provide a valid year."),

    body("inv_description")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please provide a description."),

    body("inv_image")
      .trim()
      .notEmpty()
      .withMessage("Please provide a valid image URL."),

    body("inv_thumbnail")
      .trim()
      .notEmpty()
      .withMessage("Please provide a valid thumbnail URL."),

    body("inv_price")
      .trim()
      .notEmpty()
      .isFloat({ min: 0 })
      .withMessage("Please provide a valid price."),

    body("inv_miles")
      .trim()
      .notEmpty()
      .isInt({ min: 0 })
      .withMessage("Please provide a valid mileage."),

    body("inv_color")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a color."),
  ];
};

validate.checkInventoryData = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    const classificationList = await utilities.buildClassificationList();
    res.render("inventory/add-inventory", {
      errors,
      title: "Add Inventory",
      nav,
      classificationList,
      ...req.body,
    });
    return;
  }
  next();
};

module.exports = validate;
