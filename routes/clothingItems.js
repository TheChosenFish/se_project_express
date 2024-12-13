const router = require("express").Router();
const auth = require("../middlewares/auth")

const { createItem, getItems, likeItem, deleteLike, deleteItem } = require("../controllers/clothingItems");
// read
router.get("/", getItems);
router.use('/', auth);
// create
router.post("/", createItem);
// delete
router.delete("/:itemId", deleteItem)
// like
router.put("/:itemId/likes", likeItem)
// dislike
router.delete("/:itemId/likes", deleteLike)

module.exports = router;
