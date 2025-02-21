import validator from "validator";
import { celebrate, Joi } from "celebrate";

const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

function clothingItemValidation() {
  Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    imageURL: Joi.string().required().url(),
  });
}

function newUserValidation() {
  Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().url(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
}

function userLoginValidation() {
  Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
}

function clothingItemIdValidation() {
  Joi.object().keys({
    itemId: Joi.string().required(),
  });
}

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    // ...
  }),
});

module.exports = {
  clothingItemIdValidation,
  clothingItemValidation,
  userLoginValidation,
  newUserValidation,
};
