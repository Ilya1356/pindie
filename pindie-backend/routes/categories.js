// const categoriesRouter = require("express").Router();

// // Импортируем вспомогательные функции
// const {
//     createCategory,
//     findCategoryById,
//     updateCategory,
//     deleteCategory,
//     checkEmptyName
//   } = require("../middlewares/categories.js");
//   const {
//     sendAllCategories,
//     sendCategoryById,
//     sendCategoryCreated,
//     sendCategoryDeleted,
//     sendCategoryUpdated
//   } = require("../controllers/categories.js");

// // Обрабатываем GET-запрос с роутом '/categories'
// categoriesRouter.get("/categories", sendAllCategories);
// categoriesRouter.post(
//     "/categories",
//     checkEmptyName,
//     createCategory,
//     sendCategoryCreated
// );
// categoriesRouter.get("/categories/:id", findCategoryById, sendCategoryById);
// categoriesRouter.put(
//     "/categories/:id",
//     checkEmptyName,
//     updateCategory,
//     sendCategoryUpdated
// );
// categoriesRouter.delete(
//     "/categories/:id",
//     deleteCategory,
//     sendCategoryDeleted
// );

// // Экспортируем роут для использования в приложении — app.js
// module.exports = categoriesRouter;


const categoriesRouter = require("express").Router();

const {
  findAllCategories,
  createCategory,
  findCategoryById,
  updateCategory,
  deleteCategory,
  checkIsCategoryExists,
  checkEmptyName
} = require("../middlewares/categories.js");
const {
  sendAllCategories,
  sendCategoryById,
  sendCategoryCreated,
  sendCategoryDeleted,
  sendCategoryUpdated
} = require("../controllers/categories.js");
const { checkAuth } = require("../middlewares/auth.js");

categoriesRouter.get("/categories", findAllCategories, sendAllCategories);
categoriesRouter.post(
  "/categories",
  findAllCategories,
  checkIsCategoryExists,
  checkEmptyName,
  checkAuth,
  createCategory,
  sendCategoryCreated
);
categoriesRouter.get("/categories/:id", findCategoryById, sendCategoryById);
categoriesRouter.put(
  "/categories/:id",
  checkEmptyName,
  checkAuth,
  updateCategory,
  sendCategoryUpdated
);
categoriesRouter.delete("/categories/:id", deleteCategory,
checkAuth, sendCategoryDeleted);

module.exports = categoriesRouter;
