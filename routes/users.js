const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const { celebrate, Joi } = require("celebrate");
// start with /users
// router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      avatar: Joi.string().required().uri(),
    }),
  }),
  updateUser
);
// router.post("/", createUser);

module.exports = router;
