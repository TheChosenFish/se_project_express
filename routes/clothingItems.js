const router = require("express").Router();
const auth = require("../middlewares/auth");
const { celebrate, Joi } = require("celebrate");

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
      name: Joi.string().required(),
      weather: Joi.string().required(),
      imageUrl: Joi.string().required().uri(),
    }),
  }),
  createItem
);
// delete
router.delete(
  "/:itemId",
  celebrate({
    body: Joi.object().keys({
      itemId: Joi.string().required(),
    }),
  }),
  deleteItem
);
// like
router.put(
  "/:itemId/likes",
  celebrate({
    body: Joi.object().keys({
      itemId: Joi.string().required(),
    }),
  }),
  likeItem
); // /items/itemId/likes
// dislike
router.delete(
  "/:itemId/likes",
  celebrate({
    body: Joi.object().keys({
      itemId: Joi.string().required(),
    }),
  }),
  deleteLike
);

module.exports = router;
