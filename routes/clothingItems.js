const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
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
router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      weather: Joi.string().valid("hot", "warm", "cold").required(),
      imageUrl: Joi.string().required().uri(),
    }),
  }),
  createItem
);
// delete
router.delete(
  "/:itemId",
  celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteItem
);
// like
router.put(
  "/:itemId/likes",
  celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().length(24).hex().required(),
    }),
  }),
  likeItem
); // /items/itemId/likes
// dislike
router.delete(
  "/:itemId/likes",
  celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteLike
);

module.exports = router;
