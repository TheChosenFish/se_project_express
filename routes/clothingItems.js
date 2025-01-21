const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  createItem,
  getItems,
  likeItem,
  deleteLike,
  deleteItem,
} = require("../controllers/clothingItems");

// routes start with /items

// read
router.get("/", getItems); // get request to /items/
router.use("/", auth);
// create
router.post("/", createItem);
// delete
router.delete("/:itemId", deleteItem);
// like
router.put("/:itemId/likes", likeItem); // /items/itemId/likes
// dislike
router.delete("/:itemId/likes", deleteLike);

module.exports = router;
