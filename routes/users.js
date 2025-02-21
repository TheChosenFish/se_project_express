const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { getCurrentUser, updateUser } = require("../controllers/users");
// start with /users
// router.get("/", getUsers);
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
// router.post("/", createUser);

module.exports = router;
