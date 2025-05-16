const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { getCurrentUser, updateUser } = require("../controllers/users");

router.get("/me", getCurrentUser);
router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      avatar: Joi.string().required().uri(),
    }),
  }),
  updateUser
);

module.exports = router;
