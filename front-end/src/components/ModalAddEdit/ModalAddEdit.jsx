import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
} from "@mui/material";

const ModalAddEdit = ({ open, product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    category: "",
    image: "", // Ajouter le champ image
    stock: "", // Ajouter le champ stock
  });
  console.log("product", product);
  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.image || "", // Ajouter le champ image
        stock: product.stock || "", // Ajouter le champ stock
      });
    } else {
      setFormData({
        id: "",
        name: "",
        description: "",
        price: "",
        category: "",
        image: "", // Ajouter le champ image
        stock: "", // Ajouter le champ stock
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.category ||
      !formData.image ||
      !formData.stock
    ) {
      alert("Tous les champs sont obligatoires.");
      return;
    }
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>
        {product ? "Modifier le produit" : "Ajouter un produit"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            name="name"
            label="Nom du produit"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            name="price"
            label="Prix"
            type="number"
            value={formData.price}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="category"
            label="Catégorie"
            select
            value={formData.category}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Physical">Physical</MenuItem>
            <MenuItem value="Digital">Digital</MenuItem>
          </TextField>
          <TextField
            name="image"
            label="URL de l'image"
            value={formData.image}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="stock"
            label="Stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary">
          Annuler
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Sauvegarder
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalAddEdit;
