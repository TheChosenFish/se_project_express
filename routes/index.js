const router = require("express").Router();

const clothingItem = require("./clothingItems");
const auth = require("../middlewares/auth");
const NotFoundError = require("../errors/NotFoundError");

const userRouter = require("./users");

router.use("/items", clothingItem);
router.use(auth);
router.use("/users", userRouter);

router.use((req, res, next) => {
  next(new NotFoundError("route not found"));
});

module.exports = router;
