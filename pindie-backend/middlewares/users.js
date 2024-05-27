// const users = require("../models/user");
// const bcrypt = require("bcryptjs");

// const findAllUsers = async (req, res, next) => {
//   console.log("GET /api/users");
//   req.usersArray = await users.find({}, { password: 0 });
//   next();
// };

// const createUser = async (req, res, next) => {
//   try {
//     req.user = await users.create(req.body);
//     next();
//   } catch (error) {
//     res.status(400).send("Ошибка при создании пользователя");
//   }
// };


// const findUserById = async (req, res, next) => {
//   console.log("GET /api/users/:id");
//   try {
//     req.user = await users.findById(req.params.id, { password: 0 });
//     next();
//   } catch (error) {
//     res.status(404).send("User not found");
//   }
// };

// const updateUser = async (req, res, next) => {
//   try {
//     // В метод передаём id из параметров запроса и объект с новыми свойствами
//     req.user = await users.findByIdAndUpdate(req.params.id, req.body);
//     next();
//   } catch (error) {
//     res.setHeader("Content-Type", "application/json");
//     res.status(400).send(JSON.stringify({ message: "Ошибка обновления пользователя" }));
//   }
// };

// const deleteUser = async (req, res, next) => {
//   try {
//     req.user = await users.findByIdAndDelete(req.params.id);
//     next();
//   } catch (error) {
//     res.setHeader("Content-Type", "application/json");
//     res.status(400).send(JSON.stringify({ message: "Ошибка удаления пользователя" }));
//   }
// };

// const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
//   if (
//     !req.body.name ||
//     !req.body.email ||
//     !req.body.password
//   ) {
//     // Если какое-то из полей отсутствует, то не будем обрабатывать запрос дальше,
//     // а ответим кодом 400 — данные неверны.
//     res.setHeader("Content-Type", "application/json");
//     res.status(400).send(JSON.stringify({ message: "Заполни все поля" }));
//   } else {
//     // Если всё в порядке, то передадим управление следующим миддлварам
//     next();
//   }
// };

// const checkEmptyNameAndEmail = async (req, res, next) => {
//   if (
//     !req.body.name ||
//     !req.body.email
//   ) {
//     // Если какое-то из полей отсутствует, то не будем обрабатывать запрос дальше,
//     // а ответим кодом 400 — данные неверны.
//     res.setHeader("Content-Type", "application/json");
//     res.status(400).send(JSON.stringify({ message: "Заполни все поля" }));
//   } else {
//     // Если всё в порядке, то передадим управление следующим миддлварам
//     next();
//   }
// };

// const hashPassword = async (req, res, next) => {
//   try {
//     // Создаём случайную строку длиной в десять символов
//     const salt = await bcrypt.genSalt(10);
//     // Хешируем пароль
//     const hash = await bcrypt.hash(req.body.password, salt);
//     // Полученный в запросе пароль подменяем на хеш
//     req.body.password = hash;
//     next();
//   } catch (error) {
//     res.status(400).send({ message: "Ошибка хеширования пароля" });
//   }
// };

// const checkIsUserExists = async (req, res, next) => {
//   const isInArray = req.usersArray.find((user) => {
//     return req.body.email === user.email;
//   });
//   if (isInArray) {
//     res
//       .status(400)
//       .send({ message: "Пользователь с таким email уже существует" });
//   } else {
//     next();
//   }
// };

// // Экспортируем функцию поиска всех пользователей
// module.exports = { findAllUsers, createUser, checkIsUserExists, findUserById, updateUser, deleteUser, checkEmptyNameAndEmailAndPassword, checkEmptyNameAndEmail, hashPassword };


const users = require("../models/user");
const bcrypt = require("bcryptjs");

const hashPassword = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(req.body.password, salt);

    req.body.password = hash;
    next();
  } catch (err) {
    res.status(400).send({ message: "Ошибка хеширования пароля" });
  }
};

const findAllUsers = async (req, res, next) => {
  console.log("GET /users");
  req.usersArray = await users.find({});
  next();
};

const findUserById = async (req, res, next) => {
  console.log("GET /users/:id");
  try {
    req.user = await users.findById(req.params.id);
    next();
  } catch (error) {
    res.status(404).send({ message: "User not found" });
  }
};

const checkEmptyNameAndEmail = async (req, res, next) => {
  if (!req.body.username || !req.body.email) {
    res.status(400).send({ message: "Введите имя и email" });
  } else {
    next();
  }
};

const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.status(400).send({ message: "Введите имя, email и пароль" });
  } else {
    next();
  }
};

const checkIsUserExists = async (req, res, next) => {
  const isInArray = req.usersArray.find((user) => {
    return req.body.email === user.email;
  });
  if (isInArray) {
    res
      .status(400)
      .send({ message: "Пользователь с таким email уже существует" });
  } else {
    next();
  }
};

const createUser = async (req, res, next) => {
  console.log("POST /users");
  try {
    console.log(req.body);
    req.user = await users.create(req.body);
    next();
  } catch (error) {
    res.status(400).send({ message: "Error creating user" });
  }
};

const updateUser = async (req, res, next) => {
  console.log("PUT /users/:id");
  try {
    req.user = await users.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res.status(400).send({ message: "Error updating user" });
  }
};

const deleteUser = async (req, res, next) => {
  console.log("DELETE /users/:id");
  try {
    req.user = await users.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    res.status(400).send({ message: "Error deleting user" });
  }
};

module.exports = {
  findAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  checkIsUserExists,
  checkEmptyNameAndEmail,
  checkEmptyNameAndEmailAndPassword,
  hashPassword,
};
