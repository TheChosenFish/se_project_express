const ClothingItem = require("../models/clothingItem");
const { NOT_FOUND, BAD_REQUEST, DEFAULT } = require("../utils/errors");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl, owner } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({message: "Invalid data" });
      }
      res.status(DEFAULT).send({ message: "Error from  createItem" });
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

  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) =>
      res.status(200).send({ item })
    )
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "item not found" });
      } if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "item request failed" });
      }
      res.status(DEFAULT).send({ message: "item request error" });
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
        return res.status(NOT_FOUND).send({ message: "items not found"  });
      } if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "items request failed" });
      }
      res.status(DEFAULT).send({ message: "Get items failed" });
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
    .catch((error) => {
      if (error.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "items not found" });
      } if (error.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "items request failed" });
      }
      res.status(DEFAULT).send({ message: "Get items failed" });
    });
};

module.exports = { createItem, getItems, likeItem, deleteLike, deleteItem };
