const router = require("express").Router();
const { NOT_FOUND } = require("../utils/errors");
const clothingItem = require("./clothingItems");
const auth = require("../middlewares/auth");
const NotFoundError = require("../errors/BadRequestError");

// const login = require("./users")
// const createUser = require("./users")

const userRouter = require("./users");

router.use("/items", clothingItem);
router.use("/", auth);
router.use("/users", userRouter);

router.use((req, res) => {
  return next(new NotFoundError("item not found"));
});

module.exports = router;
