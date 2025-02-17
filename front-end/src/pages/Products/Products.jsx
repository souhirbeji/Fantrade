import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getProducts } from "../../api/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    category: "",
    universe: "",
    minPrice: "",
    maxPrice: "",
  });
  const [page, setPage] = useState(1);
  const itemsPerPage = 16;
  console.log("products", products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (e) => setSearch(e.target.value);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = filter.category
      ? product.category.toLowerCase() === filter.category.toLowerCase()
      : true;
    const matchesPrice =
      (filter.minPrice ? product.price >= parseFloat(filter.minPrice) : true) &&
      (filter.maxPrice ? product.price <= parseFloat(filter.maxPrice) : true);
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box sx={{ padding: "20px" }}>
      {/* Search and Filter Section */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          margin: "20px 0",
          alignItems: "center",
          backgroundColor: "#f8f9fa",
          padding: "15px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search Product"
          fullWidth
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{
            flex: "1",
            maxWidth: "300px",
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid #ddd", // Ajouter une bordure
          }}
        />

        <FormControl sx={{ flex: "1", maxWidth: "200px" }}>
          <InputLabel>Categorie</InputLabel>
          <Select
            name="category"
            value={filter.category}
            onChange={handleFilterChange}
            sx={{ border: "1px solid #ddd" }} // Ajouter une bordure
          >
            <MenuItem value="">Touts</MenuItem>
            <MenuItem value="physical">Physical</MenuItem>
            <MenuItem value="digital">Digital</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Min Price"
          name="minPrice"
          variant="outlined"
          type="number"
          fullWidth
          value={filter.minPrice}
          onChange={handleFilterChange}
          sx={{
            flex: "1",
            maxWidth: "120px",
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid #ddd", // Ajouter une bordure
          }}
        />

        <TextField
          label="Max Price"
          name="maxPrice"
          variant="outlined"
          type="number"
          fullWidth
          value={filter.maxPrice}
          onChange={handleFilterChange}
          sx={{
            flex: "1",
            maxWidth: "120px",
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid #ddd", // Ajouter une bordure
          }}
        />
      </Box>

      {/* Products Grid */}
      <Grid container spacing={4}>
        {paginatedProducts.length ? (
          paginatedProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))
        ) : (
          <Typography
            variant="h6"
            color="textSecondary"
            align="center"
            sx={{ width: "100%", marginTop: "20px" }}
          >
            Pas de produits trouvés
          </Typography>
        )}
      </Grid>

      {/* Pagination */}
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Pagination
          count={Math.ceil(filteredProducts.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default Products;
