const Item = require("../models/productsModel");

// Créer un nouvel article
const createItem = async (req, res) => {
  try {
    const items = Array.isArray(req.body) ? req.body : [req.body];
    // const itemsWithSeller = items.map(item => ({ ...item, seller: req.user.id }));
    const createdItems = await Item.insertMany(items);

    res
      .status(201)
      .send(createdItems.length === 1 ? createdItems[0] : createdItems);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Obtenir tous les articles avec des filtres
const getItems = async (req, res) => {
  try {
    const filter = {};

    // Filtres optionnels
    if (req.query.name) {
      filter.name = { $regex: req.query.name, $options: "i" };
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.universe) {
      filter.universe = { $regex: req.query.universe, $options: "i" };
    }

    const items = await Item.find(filter).populate("seller", "name email");
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getItemsById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mettre à jour un article existant
const updateItem = async (req, res) => {
  try {
    // Find the item by its ID
    const item = await Item.findById(req.params.itemId).populate(
      "seller",
      "name email"
    );

    // Check if the item exists
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Check if the authenticated user is the seller of the item
    if (item.seller._id.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this item" });
    }

    // Update the item with the new data from the request body
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.itemId,
      req.body,
      { new: true }
    ).populate("seller", "name email");

    // Respond with the updated item
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un article
const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.itemId);

    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir les articles d'un vendeur spécifique
const getItemsBySellerId = async (req, res) => {
  try {
    const items = await Item.find({ seller: req.params.sellerId });

    if (!items.length) {
      return res.status(201).json({ error: "No items found for this seller" });
    }

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ajouter une évaluation à un article
const addRatingToItem = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    const item = await Item.findById(req.params.itemId);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    item.ratings.push({
      user: req.user.id,
      rating,
      comment,
    });

    await item.save();
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  getItemsBySellerId,
  addRatingToItem,
  getItemsById,
};
