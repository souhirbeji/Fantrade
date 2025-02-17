const express = require("express");
const {
  Register,
  Login,
  updateUser,
  deleteUser,
  getUserByToken,
} = require("../controllers/userController");
const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  getItemsBySellerId,
  addRatingToItem,
  getItemsById
} = require("../controllers/itemController");

const authMiddleware = require("../Middleware/authMiddleware");
const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.put("/update/:id", authMiddleware, updateUser);
router.delete("/delete", authMiddleware, deleteUser);
router.get("/me", authMiddleware, getUserByToken);
router.post("/create", authMiddleware, createItem);
router.get("/products", getItems);
router.get("/products/:itemId", getItemsById);
router.get("/products/:sellerId", authMiddleware, getItemsBySellerId);
router.put("/update-product/:itemId", authMiddleware, updateItem);
router.delete("/delete/:itemId", authMiddleware, deleteItem);
router.post("/:itemId/rating", authMiddleware, addRatingToItem);

module.exports = router;
