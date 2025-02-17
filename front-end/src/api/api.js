import axios from "axios";

const API_URL = process.env.REACT_API_URL || "http://localhost:8060";

// Ajouter un intercepteur de requête pour inclure le token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Fonction pour obtenir les informations de l'utilisateur connecté
export const getUserByToken = async () => {
  try {
    const response = await axios.get(`${API_URL}/me`);
    return response.data.user;
  } catch (error) {
    console.error("Failed to fetch user", error);
    throw error;
  }
};

// Fonction pour obtenir les produits
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Fonction pour créer un produit
export const createProduct = async (data) => {
  console.log("data", data);
  try {
    const response = await axios.post(`${API_URL}/create`, data);

    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

// Fonction pour mettre à jour un produit
export const updateProduct = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/update-product/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Fonction pour supprimer un produit
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// Fonction pour obtenir les produits par ID de vendeur
export const getProductsBySellerId = async (sellerId) => {
  try {
    const response = await axios.get(`${API_URL}/products`, {
      params: { sellerId: sellerId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products by seller ID:", error);
    throw error;
  }
};

// Fonction pour ajouter une évaluation à un produit
export const addRatingToProduct = async (itemId, rating) => {
  try {
    const response = await axios.post(`${API_URL}/${itemId}/rating`, rating);
    return response.data;
  } catch (error) {
    console.error("Error adding rating to product:", error);
    throw error;
  }
};

// Fonction pour obtenir un produit par ID
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};
