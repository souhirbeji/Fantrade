import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Rating,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleSeeCart = (product) => {
    navigate(`/product/${product._id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 300,
        height: 400,
        margin: "auto",
        borderRadius: "15px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
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
        image={product?.image || "https://via.placeholder.com/300"}
        alt={product.name}
        sx={{
          objectFit: "cover",
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
        }}
      />
      <CardContent sx={{ textAlign: "center", padding: "15px" }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "bold",
            fontSize: "16px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ height: "40px", overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {product.description}
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ margin: "10px 0" }}
        >
          <Rating
            value={
              product.ratings.reduce((a, r) => a + r.rating, 0) /
                product.ratings.length || 0
            }
            readOnly
            precision={0.5}
          />
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginLeft: 1 }}
          >
            ({product.ratings.length})
          </Typography>
        </Box>
        <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
          {product.price} €
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginTop: "10px",
            textTransform: "none",
            borderRadius: "8px",
            width: "100%",
          }}
          onClick={() => handleSeeCart(product)}
        >
          Open
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
