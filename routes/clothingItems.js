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

router.get("/", getItems);
router.use(auth);

router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      weather: Joi.string().valid("hot", "warm", "cold").required(),
      imageUrl: Joi.string().uri().required(),
    }),
  }),
  createItem
);

router.delete(
  "/:itemId",
  celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteItem
);

router.put(
  "/:itemId/likes",
  celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().length(24).hex().required(),
    }),
  }),
  likeItem
);

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
