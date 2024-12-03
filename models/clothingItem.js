const mongoose = require("mongoose");
const validator = require("validator");
// const { link } = require("../routes");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  weather: {
    type: "String",
    enum: ["hot", "warm", "cold"],
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    default: [],
  },
  createdAt: {
    default: Date.now(),
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("clothingItem", clothingItemSchema);
