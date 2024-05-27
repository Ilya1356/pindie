// const usersRouter = require("express").Router();

// const {
//     findAllUsers,
//     findUserById,
//     createUser,
//     updateUser,
//     deleteUser,
//     checkEmptyNameAndEmailAndPassword,
//     hashPassword,
//     checkEmptyNameAndEmail,
//     checkIsUserExists
// } = require("../middlewares/users.js");
// const {
//     sendAllUsers,
//     sendUserById,
//     sendUserCreated,
//     sendUserUpdated,
//     sendUserDeleted
// } = require("../controllers/users.js");

// // Обрабатываем GET-запрос с роутом '/users'
// usersRouter.get("/users", findAllUsers, sendAllUsers);
// usersRouter.post(
//     "/users",
//     findAllUsers,
//     checkIsUserExists,
//     checkEmptyNameAndEmailAndPassword,
//     hashPassword,
//     createUser,
//     sendUserCreated
// );
// usersRouter.get("/users/:id", findUserById, sendUserById);
// usersRouter.put(
//     "/users/:id",
//     checkEmptyNameAndEmail,
//     updateUser,
//     sendUserUpdated
// );
// usersRouter.delete(
//     "/users/:id",
//     deleteUser,
//     sendUserDeleted
// );


// // Экспортируем роут для использования в приложении — app.js
// module.exports = usersRouter;


const usersRouter = require("express").Router();

const {
  findAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  checkIsUserExists,
  checkEmptyNameAndEmail,
  checkEmptyNameAndEmailAndPassword,
  hashPassword,
} = require("../middlewares/users.js");
const {
  sendAllUsers,
  sendUserById,
  sendUserCreated,
  sendUserUpdated,
  sendUserDeleted,
  sendMe,
} = require("../controllers/users.js");
const { checkAuth } = require("../middlewares/auth.js");

usersRouter.get("/users", findAllUsers, sendAllUsers);
usersRouter.post(
  "/users",
  findAllUsers,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  checkAuth,
  hashPassword,
  createUser,
  sendUserCreated
);
usersRouter.get("/users/:id", findUserById, sendUserById);
usersRouter.put(
  "/users/:id",
  checkEmptyNameAndEmail,
  checkAuth,
  updateUser,
  sendUserUpdated
);
usersRouter.delete("/users/:id", deleteUser, checkAuth, sendUserDeleted);
usersRouter.get("/me", checkAuth, sendMe)

module.exports = usersRouter;
