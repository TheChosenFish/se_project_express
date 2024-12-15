const router = require("express").Router();
const { getCurrentUser } = require("../controllers/users");

// start with /users
// router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.get("/users/me");
// router.post("/", createUser);

module.exports = router;
