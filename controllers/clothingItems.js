const ClothingItem = require("../models/clothingItem");
const {
  NOT_FOUND,
  BAD_REQUEST,
  DEFAULT,
  FORBIDDEN_ERROR,
} = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      return res.status(DEFAULT).send({ message: "Error from  createItem" });
    });
};

const getItems = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((error) => {
      res.status(DEFAULT).send({ error });
    });
};

// const updateItem = (req, res) => {
//   const {itemId} = req.params;
//   const {imageURL} = req.body;

//   ClothingItem.findByIdAndUpdate(itemId, {$set:{imageURL}}).orFail().then((item) => res.status(200).send())
//   .catch((e) => {
//     res.status(500).send({ message: "Update item error", e });
//   });
// };

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (req.user._id !== item.owner.toString()) {
        const error = new Error();
        error.name = "ForbiddenError";
        throw error;
      }
      return ClothingItem.findByIdAndDelete(itemId);
    })
    .then((items) => res.status(200).send({ items }))
    .catch((err) => {
      if (err.code === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "item not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "item request failed" });
      }

      if (err.name === "ForbiddenError") {
        return res
          .status(FORBIDDEN_ERROR)
          .send({ message: "forbidden action" });
      }
      return res.status(DEFAULT).send({ message: "item request error" });
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "items not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "items request failed" });
      }
      return res.status(DEFAULT).send({ message: "Get items failed" });
    });
};

const deleteLike = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "items not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "items request failed" });
      }
      return res.status(DEFAULT).send({ message: "Get items failed" });
    });
};

module.exports = { createItem, getItems, likeItem, deleteLike, deleteItem };
