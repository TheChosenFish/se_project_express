const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  DEFAULT,
  BAD_REQUEST,
  NOT_FOUND,
  DUPLICATE,
  UNAUTHORIZED,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

// GET /users

// const getUsers = (req, res) => {
//   User.find({})
//     .then((users) => res.status(200).send(users))
//     .catch((err) => {
//       console.error(err);
//       return res
//         .status(DEFAULT)
//         .send({ message: "An error has occurred on the server" });
//     });
// };

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) =>
      res
        .status(201)
        .send({
          name: user.name,
          avatar: user.avatar,
          email: user.email,
          _id: user._id,
        })
    )
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "An error has occurred on the server" });
      }
      if (err.code === 11000) {
        return res.status(DUPLICATE).send({ message: "Duplicate Error" });
      }
      return res
        .status(DEFAULT)
        .send({ message: "An error has occurred on the server" });
    });
};

const getCurrentUser = (req, res) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User was not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid ID" });
      }
      return res.status(DEFAULT).send({ err: err.message });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return res
          .status(UNAUTHORIZED)
          .send({ message: "Authorization error" });
      }
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        return res
          .status(UNAUTHORIZED)
          .send({ message: "Incorrect password or email" });
      }
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(200).send({ message: token });
    })
    .catch((err) => {
      res.status(DEFAULT).send({ message: err.message });
    });
};

//   {
//   const { email, password } = req.body;

//   return User.findUserByCredentials(email, password)
//     .then((user) => {

//       return res.status(200).send({ token });
//     })
//     .catch((err) => {
//       console.error(err.name);

//       return res.status(500).send({ message: "server error" });
//     });
// };
module.exports = { createUser, getCurrentUser, login };
