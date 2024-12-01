const router = require("express").Router();
const { NOT_FOUND, BAD_REQUEST, DEFAULT} = require("../utils/errors");
const clothingItem = require("./clothingItems")


const userRouter = require("./users");


router.use("/items", clothingItem)
router.use("/users", userRouter);

router.use((req,res) => {
  res.status(NOT_FOUND).send({message:"Router not found"})
})

module.exports = router;
