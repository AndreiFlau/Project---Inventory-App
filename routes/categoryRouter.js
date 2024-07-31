const { Router } = require("express");
const { categoriesGet, categorieProductsGet } = require("../controllers/categoryController");
const categoryRouter = Router();

// categoryRouter.get("/", (req, res) => {
//   res.render("categories");
// });

categoryRouter.get("/", categoriesGet);
categoryRouter.get("/:categoryName", categorieProductsGet);

// categoryRouter.get("/:categoryid", (req, res) => {
//   //only show products that have this category id
//   res.render("categories");
// });

module.exports = categoryRouter;
