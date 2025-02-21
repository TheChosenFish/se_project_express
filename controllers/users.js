const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { DEFAULT } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");
const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/BadRequestError");
const DuplicateError = require("../errors/BadRequestError");

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) =>
      res.status(200).send({
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      })
    )
    .catch((err) => {
      console.error(err);

      if (err.name === "ValidationError") {
        return next(new BadRequestError("Validation error"));
      }
      if (err.code === 11000) {
        return next(new DuplicateError("Duplicate Error"));
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
        return next(new NotFoundError("User was not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Validation error"));
      }
      return res.status(DEFAULT).send({ err: err.message });
    });
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Validation error"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("User was not found"));
      }
      return res.status(DEFAULT).send({ err: err.message });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // {name: 'bob', email: testdsfd, avatar: http:sd, password: 1sdfj, _id: 1212k234j}
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(200).send({
        token,
        user: {
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          _id: user._id,
        },
      });
    })
    .catch((err) => {
      if (
        err.message === "Incorrect email or password" ||
        err.name === "CastError"
      ) {
        return next(new BadRequestError("Validation error"));
      }

      return res.status(DEFAULT).send({ message: err.message });
    });
};

module.exports = { createUser, getCurrentUser, login, updateUser };
