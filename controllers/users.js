const User = require("../models/user");
const error = require(BAD_REQUEST, NOT_FOUND, DEFAULT);

//GET /users

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((error) => {
      console.error(err);
      return res.status(500).send({ message: "An error has occurred on the server" });
    });
};

const createUser = (req, res) => {
  const { name, body } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((error) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "An error has occurred on the server" });
      }
      return res.status(500).send({ message: "An error has occurred on the server" });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((error) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ err: err.message });
      } else if (err.name === "CastError") {
        res.status(400).send({ err: err.message });
      }
      return res.status(500).send({ err: err.message });
    });
};

module.exports = { getUsers, createUser, getUserById };
