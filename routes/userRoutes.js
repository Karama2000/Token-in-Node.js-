// Importation des modules nécessaires
const express = require("express");
const { 
    getAllUsersController, 
    getUserByIdController, 
    createUserController, 
    deleteUserByIdController, 
    updateUserByIdController,
    loginUserController
} = require('../controllers/userController');

const userRouter = express.Router();
const verifyRole = require('../middlewares/roleMiddleware'); // Importation du middleware

// Routes pour la gestion des utilisateurs

// --- Routes accessibles uniquement aux admins ---
userRouter.get('/', verifyRole(['admin']), getAllUsersController); // Liste des utilisateurs
userRouter.post('/', verifyRole(['admin']), createUserController); // Créer un utilisateur
userRouter.delete('/:id', verifyRole(['admin']), deleteUserByIdController); // Supprimer un utilisateur

// --- Route accessible uniquement aux fournisseur et admin ---
userRouter.put('/:id', verifyRole(['admin','fournisseur']), updateUserByIdController); // Mettre à jour un utilisateur

// --- Routes accessibles à tous les utilisateurs authentifiés ---
userRouter.get('/:id', verifyRole(['admin', 'user', 'fournisseur']), getUserByIdController); // Obtenir un utilisateur par ID

// --- Routes publiques ---
userRouter.post('/login', loginUserController); // Connexion
// Exportation du routeur pour pouvoir l'utiliser dans d'autres fichiers
module.exports = userRouter;

