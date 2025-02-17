import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TablePagination,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import { Edit, Delete, Add, Sell } from "@mui/icons-material";
import ModalYesNo from "../ModalYesNo/ModalYesNo";
import ModalAddEdit from "../ModalAddEdit/ModalAddEdit";
import { deleteProduct, createProduct, updateProduct } from "../../api/api";

const DataTable = ({ initialProducts, user }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [modalAddEditOpen, setModalAddEditOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const userProducts = initialProducts.filter(
      (product) => product.seller._id === user.id
    );
    setProducts(userProducts);
    setFilteredProducts(userProducts);
  }, [initialProducts, user.id]);

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setModalDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(productToDelete._id);
      setProducts((prev) => prev.filter((p) => p._id !== productToDelete._id));
      setFilteredProducts((prev) =>
        prev.filter((p) => p._id !== productToDelete._id)
      );
      setModalDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const cancelDelete = () => {
    setModalDeleteOpen(false);
  };

  const handleAddClick = () => {
    setProductToEdit(null);
    setModalAddEditOpen(true);
  };

  const handleEditClick = (product) => {
    setProductToEdit(product);
    setModalAddEditOpen(true);
  };

  const handleSaveProduct = async (product) => {
    try {
      if (productToEdit) {
        const updatedProduct = await updateProduct(productToEdit._id, product);
        setProducts((prev) =>
          prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
        );
        setFilteredProducts((prev) =>
          prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
        );
      } else {
        const data = {
          seller: user.id,
          image: product.image,
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          stock: product.stock,
        };

        const newProduct = await createProduct(data);

        setProducts((prev) => [...prev, newProduct]);
        setFilteredProducts((prev) => [...prev, newProduct]);
      }
      setModalAddEditOpen(false);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const truncateDescription = (description) => {
    return description.length > 30
      ? description.substring(0, 30) + "..."
      : description;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6" gutterBottom>
        Liste des produits
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <TextField
          label="Search..."
          variant="outlined"
          fullWidth
          onChange={(e) => {
            const value = e.target.value.toLowerCase();
            setFilteredProducts(
              products.filter(
                (product) =>
                  product.name.toLowerCase().includes(value) ||
                  product.description.toLowerCase().includes(value)
              )
            );
          }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          sx={{
            marginLeft: 2,
            textTransform: "none",
            borderRadius: "8px",
            padding: "8px 20px",
          }}
          onClick={handleAddClick}
        >
          Ajouter
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Catégorie</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: 50, height: 50 }}
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    {truncateDescription(product.description)}
                  </TableCell>
                  <TableCell>{product?.price.toFixed(2)} €</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(product)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(product)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Modal Yes/No */}
      <ModalYesNo
        open={modalDeleteOpen}
        title="Confirmation de suppression"
        description={`Voulez-vous vraiment supprimer le produit "${productToDelete?.name}" ?`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      {/* Modal Add/Edit */}
      <ModalAddEdit
        open={modalAddEditOpen}
        product={productToEdit}
        onSave={handleSaveProduct}
        onCancel={() => setModalAddEditOpen(false)}
      />
    </Box>
  );
};

export default DataTable;
