//controller that fetches data about product from database
const asyncHandler = require("express-async-handler");
const { getAllInstruments } = require("../db/queries");

exports.allProductsGet = asyncHandler(async (req, res) => {
  const instruments = await getAllInstruments();
  res.render("allproducts", { instruments: instruments });
});
