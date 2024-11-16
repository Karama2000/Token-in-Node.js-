// Importation des modules nécessaires
const express = require("express");
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes'); // Importation du routeur pour les utilisateurs

// Chargement des variables d'environnement depuis un fichier .env
const dotenv = require('dotenv');
dotenv.config();

// Importation et connexion à la base de données (process.env)
const { dbConnect } = require('./config/dbConnect');
dbConnect();

const app = express();

// Middlewares
app.use(express.json()); // Permet de traiter les données JSON dans les requêtes

// Routes

// ---Posts
app.use('/api/posts/', postRouter); // Définit la route pour gérer les posts avec le routeur associé

// ---Users
app.use('/api/users/', userRouter); // Définit la route pour gérer les utilisateurs avec le routeur associé

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
