const mongoose = require("mongoose");
const validator = require("validator");
const { link } = require("../routes");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
    minimum: 2,
    maximum: 20,
  },
  weather: {
    type: ("hot", "warm", "cold"),
    required: true,
  },
  imageUrl: {
    type: "String",
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Link is not valid",
    },
  },
  owner: {
    type: "String",
    required: true,
    ObjectId: "",

  },
  likes: {
    type: "String",
    required: true,
    ObjectId: user.ObjectId({}),
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Link is not valid",
    },
  },
  createdAt: {
    type: Date,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Link is not valid",
    },
  },
});

module.exports = mongoose.model("clothingItem", clothingItemSchema);
