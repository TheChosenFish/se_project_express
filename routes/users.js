const router = require("express").Router();
const { getUsers, createUser, getCurrentUser, login } = require("../controllers/users");

// start with /users
// router.get("/", getUsers);
router.get("/me", getCurrentUser);
// router.post("/", createUser);



module.exports = router;
