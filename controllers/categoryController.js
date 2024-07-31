//controller that calls db with inner/outer join and returns the products based on their ids
const asyncHandler = require("express-async-handler");
const { getCategories, getInstrumentsByCategories } = require("../db/queries");

exports.categoriesGet = asyncHandler(async (req, res) => {
  const categories = await getCategories();
  res.render("categories", { categories: categories });
});

exports.categorieProductsGet = asyncHandler(async (req, res) => {
  const categoryName = req.params.categoryName;
  const instruments = await getInstrumentsByCategories(categoryName);
  res.render("categoryproducts", { instruments: instruments });
});
