import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductGrid = ({ products }) => {
  console.log(products);
  const navigate = useNavigate();

  const handleSeeDetails = (product) => {
    navigate(`/product/${product._id}`);
  };
  return (
    <div style={{ padding: "20px" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{ fontWeight: "bold" }}
      >
        Nos Produits
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        gutterBottom
        style={{ marginBottom: "30px", color: "#6c757d" }}
      >
        Découvrez notre sélection de produits modernes et tendances
      </Typography>
      <Grid container spacing={4}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                maxWidth: 400,
                height: 350,
                margin: "auto",
                borderRadius: "15px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.1s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={
                  product.image ||
                  " https://ideogram.ai/assets/image/lossless/response/RQ4UoT0iSGq3BhHe-mDOjQ"
                }
                // Assurez-vous que chaque produit a une propriété "image"
                alt={product.name}
                sx={{
                  objectFit: "contain", // Modifie l'ajustement de l'image
                  backgroundColor: "#f8f9fa", // Ajoute un fond gris clair pour améliorer l'esthétique
                  padding: "10px", // Ajoute un peu de padding pour éviter que l'image touche les bords
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                }}
              />
              <CardContent
                sx={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ fontWeight: "bold", fontSize: "16px" }}
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ fontWeight: "bold", fontSize: "18px" }}
                >
                  {product.price} €
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    marginTop: "15px",
                    width: "100%",
                    textTransform: "none",
                    borderRadius: "8px",
                  }}
                  onClick={() => handleSeeDetails(product)}
                >
                  Voir
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductGrid;
