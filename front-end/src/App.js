import React from "react";
import {Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Accueil from "./pages/Accueil/Accueil";
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/Products/ProductDetail";

function App() {
  const products = [
    // ... vos produits ici ...
  ];

  return (
    <>
    <Header />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/" element={<Accueil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetail products={products} />} />
      </Routes>
      
    </>
  );
}

export default App;
