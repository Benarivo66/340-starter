const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

invCont.buildByInventoryId = async function (req, res, next) {
  const inv_id = req.params.invId;
  const invData = await invModel.getInventoryById(inv_id);
  const singleInv = await utilities.buildSingleInventory(invData);
  let nav = await utilities.getNav();
  res.render("./inventory/detail", {
    title: `${invData.inv_make}, ${invData.inv_model}`,
    nav,
    singleInv
  })
}

module.exports = invCont