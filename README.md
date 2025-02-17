# FanTrade - Application Full Stack (MERN)

## Description
FanTrade est une application full-stack permettant aux utilisateurs d'acheter et de vendre des produits physiques et numériques en toute simplicité. L'application est construite avec la stack MERN (MongoDB, Express, React, Node.js), offrant une interface utilisateur moderne et un backend robuste.

## Table des matières
- [Fonctionnalités](#fonctionnalités)
- [Technologies Utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Scripts](#scripts)
- [API Endpoints](#api-endpoints)

---

## Fonctionnalités
- **Authentification utilisateur sécurisée** (bcrypt, JWT)
- **Gestion des produits** (CRUD complet)
- **Tableau de bord** avec statistiques et graphiques interactifs
- **Système de commentaires et de notes**
- **Filtrage et recherche avancée**
- **Pagination dynamique**
- **Interface utilisateur réactive** grâce à Material-UI

---

## Technologies Utilisées
### Backend
- **Node.js** : Environnement d'exécution JavaScript côté serveur
- **Express.js** : Framework web minimaliste pour la création d'API REST
- **MongoDB & Mongoose** : Base de données NoSQL et ODM
- **bcryptjs** : Hachage de mots de passe
- **jsonwebtoken** : Gestion de l'authentification via JWT

### Frontend
- **React.js** : Bibliothèque JavaScript pour la création d'interfaces utilisateur
- **Material-UI (MUI)** : Composants UI basés sur Material Design
- **Axios** : Client HTTP pour les requêtes API
- **Chart.js** & **react-chartjs-2** : Graphiques interactifs
- **React Router** : Gestion des routes côté client

---

## Installation
### Prérequis
- **Node.js** (v18+ recommandé)
- **MongoDB** installé et en cours d'exécution

### Étapes
```bash
# Cloner le dépôt
https://github.com/KiddMiguel/FanTrade.git

# Accéder au dossier backend
cd fantrade/backend

# Installer les dépendances du backend
npm install

# Configurer les variables d'environnement
cp .env.example .env

# Démarrer le backend en mode développement
npm run dev

# Accéder au dossier frontend
cd ../frontend

# Installer les dépendances du frontend
npm install --legacy-peer-deps

# Démarrer le frontend
npm start
```

---

## Scripts
### Backend
- **npm run dev** : Démarre le serveur backend avec nodemon (mode développement)
- **npm start** : Lance le serveur en mode production

### Frontend
- **npm start** : Démarre l'application React

---

## API Endpoints
### Authentification
- **POST** `/api/auth/register` : Inscription utilisateur
- **POST** `/api/auth/login` : Connexion utilisateur

### Produits
- **GET** `/api/products` : Récupérer tous les produits
- **POST** `/api/products` : Créer un produit (authentification requise)
- **PUT** `/api/products/:id` : Mettre à jour un produit
- **DELETE** `/api/products/:id` : Supprimer un produit

# Fantrade
