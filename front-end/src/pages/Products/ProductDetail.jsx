import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Rating,
  Divider,
  CircularProgress,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { getProductById } from "../../api/api";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
        console.log(product);
        setComments(productData.ratings);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentData = {
        user: "Anonymous",
        rating: 5,
        comment: newComment,
      };
      setComments([...comments, newCommentData]);
      setNewComment("");
    }
  };

  if (!product) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {product.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1 }}>
          {product.category} | {product.universe}
        </Typography>
      </Box>

      {/* Main Content */}
      <Grid container spacing={4}>
        {/* Image Section */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: 3,
              height: "350px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              image={product.image || "https://via.placeholder.com/300"}
              alt={product.name}
              sx={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </Card>
        </Grid>

        {/* Details Section */}
        <Grid item xs={12} md={6}>
          <CardContent
            sx={{
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
              boxShadow: 3,
              padding: 4,
            }}
          >
            <Typography
              variant="h5"
              sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}
            >
              {product.price.toFixed(2)} €
            </Typography>

            <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
              {product.description}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mr: 1 }}
              >
                Note moyenne:
              </Typography>
              <Rating
                value={
                  product.ratings.reduce((sum, r) => sum + r.rating, 0) /
                    product.ratings.length || 0
                }
                precision={0.5}
                readOnly
              />
              <Typography
                variant="subtitle2"
                color="textSecondary"
                sx={{ ml: 1 }}
              >
                ({product.ratings.length} reviews)
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  flex: 1,
                }}
              >
                Ajouter au panier
              </Button>
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  flex: 1,
                }}
              >
                Acheter maintenant
              </Button>
            </Box>
          </CardContent>
        </Grid>
      </Grid>

      {/* Comments Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 0, fontWeight: "bold" }}>
          Commentaire
        </Typography>

        <List>
          {comments.map((comment, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>{comment.user.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<Rating value={comment.rating} readOnly />}
                secondary={comment.comment}
              />
            </ListItem>
          ))}
        </List>

        {/* Add Comment Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Ajouter un commentaire
          </Typography>
          <TextField
            label="Saissisez votre commentaire"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, textTransform: "none" }}
            onClick={handleAddComment}
          >
            Envoyer
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetail;
