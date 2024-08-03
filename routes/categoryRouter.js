const { Router } = require("express");
const {
  categoriesGet,
  categorieProductsGet,
  getCategories,
  createCategoryGet,
  createCategoryPost,
  deleteCategoryGet,
  deleteCategoryPost,
  editCategoryGet,
  editCategoryPost,
} = require("../controllers/categoryController");
const categoryRouter = Router();

categoryRouter.use(getCategories);

categoryRouter.get("/", categoriesGet);
categoryRouter.get("/createcategory", createCategoryGet);
categoryRouter.post("/createcategory", createCategoryPost);
categoryRouter.get("/deletecategory/:id", deleteCategoryGet);
categoryRouter.post("/deletecategory/:id", deleteCategoryPost);
categoryRouter.get("/editcategory/:id", editCategoryGet);
categoryRouter.post("/editcategory/:id", editCategoryPost);
categoryRouter.get("/:categoryName", categorieProductsGet);

module.exports = categoryRouter;
