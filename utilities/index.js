const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}


Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicle could be found.</p>'
  }
  return grid
}

Util.buildSingleInventory = async function(data){
  let inv;
  if(data)
  inv = `
  <div class="invDetail-1">
  <img alt="${data.inv_make}, ${data.inv_make}" src="${data.inv_image}">
  <div class="invDetail-2">
  <h2 class="lora-normal">${data.inv_make}, ${data.inv_model}</h2>
  <div class="invDetail-3">
  <span><b>Manufacturer</b>: ${data.inv_make}</span>
  <span><b>Model</b>: ${data.inv_model}</span>
  <span><b>Production Year</b>: ${data.inv_year}</span>
  <span><b>Description</b>: ${data.inv_description}</span>
  <span><b>Price</b>: $${new Intl.NumberFormat('en-US').format(data.inv_price)}</span>
  <span><b>Mileage</b>: ${new Intl.NumberFormat('en-US').format(data.inv_miles)}</span>
  <span><b>External Color</b>: ${data.inv_color}</span>
  </div>
  </div>
  </div>
  `;
  else inv += '<p class="notice">Sorry, no matching vehicle could be found.</p>'
  return inv;
}

Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util
