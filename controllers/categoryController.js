//controller that calls db with inner/outer join and returns the products based on their ids
const asyncHandler = require("express-async-handler");
const { getCategories, getInstrumentsByCategories } = require("../db/queries");

exports.getCategories = asyncHandler(async (req, res, next) => {
  try {
    const categories = await getCategories();
    req.categories = categories;
    next();
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send("An error occurred while fetching categories");
  }
});

exports.categoriesGet = asyncHandler(async (req, res) => {
  res.render("categories", { categories: req.categories });
});

exports.categorieProductsGet = asyncHandler(async (req, res) => {
  const categoryName = req.params.categoryName;
  const instruments = await getInstrumentsByCategories(categoryName);
  res.render("categoryproducts", { instruments: instruments });
});
