const ClothingItem = require("../models/clothingItem");

const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        return next(new BadRequestError("Validation error"));
      }
      return next(err);
    });
};

const getItems = (req, res, next) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.find({})
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("item not found"));
      }
      return next(err);
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  console.log(itemId);
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
    .then((item) => res.status(200).send({ item }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("item not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Validation error"));
      }

      if (err.name === "ForbiddenError") {
        return next(new ForbiddenError("Forbidden action"));
      }
      return next(err);
    });
};

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("item not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Validation error"));
      }
      return next(err);
    });
};

const deleteLike = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("item not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Validation error"));
      }
      return next(err);
    });
};

module.exports = { createItem, getItems, likeItem, deleteLike, deleteItem };
