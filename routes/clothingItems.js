const router = require("express").Router();

const { createItem, getItems, likeItem, deleteLike, deleteItem } = require("../controllers/clothingItems");
// create
router.post("/", createItem);
// read
router.get("/", getItems);
// delete
router.delete("/:itemId", deleteItem)
// like
router.put("/:itemId/likes", likeItem)
// dislike
router.delete("/:itemId/likes", deleteLike)

module.exports = router;
