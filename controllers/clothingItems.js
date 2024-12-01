const ClothingItem = require("../models/clothingItem");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((error) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ err: err.message });
      }
      // res.status(400).send({ message: "Error from  createItem", e });
    });
};

const getItems = (req, res) => {
  const {itemId} = req.params;
  
  console.log(itemId)
  ClothingItem.findById({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(500).send({ message: "Get items failed", e });
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
  ClothingItem.findByIdAndDelete()
    .orFail()
    .then((item) =>
      res.status(200).send({ message: "clothing item delete error" })
    )
    .catch((e) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(400).send({ err: err.message });
      } else if (err.name === 'CastError') {
        return res.status(404).send({ err: err.message });
     }
    });
};


const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
};

const deleteLike = (req,res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
}

module.exports = { createItem, getItems, likeItem, deleteLike, deleteItem };
