// const authRouter = require("./auth");
// const categoriesRouter = require("./categories");
// const gamesRouter = require("./games");
// const usersRouter = require("./users");

// const apiRouter = require("express").Router();

// apiRouter.use("/api", usersRouter);
// apiRouter.use("/api", gamesRouter);
// apiRouter.use("/api", categoriesRouter);
// apiRouter.use("/api", authRouter);

// module.exports = apiRouter;

const gamesRouter = require("./games");
const usersRouter = require("./users");
const categoriesRouter = require("./categories");
const authRouter = require("./auth");

const apiRouter = require("express").Router();

apiRouter.use("/api", gamesRouter);
apiRouter.use("/api", usersRouter);
apiRouter.use("/api", categoriesRouter);
apiRouter.use("/api", authRouter);

module.exports = apiRouter;
