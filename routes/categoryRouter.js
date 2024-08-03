const { Router } = require("express");
const {
  categoriesGet,
  categorieProductsGet,
  getCategories,
  createCategoryGet,
  createCategoryPost,
} = require("../controllers/categoryController");
const categoryRouter = Router();

categoryRouter.use(getCategories);

categoryRouter.get("/", categoriesGet);
categoryRouter.get("/createcategory", createCategoryGet);
categoryRouter.post("/createcategory", createCategoryPost);
categoryRouter.get("/:categoryName", categorieProductsGet);

module.exports = categoryRouter;
