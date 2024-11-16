// Importation des modules nécessaires
const express = require("express");
const { 
    GetPostByIdController, 
    GetAllPostsContoller, 
    DeletePostByIdContoller, 
    UpdatePostByIdContoller, 
    CreatePostContoller 
} = require('../controllers/postsController');

const postRouter = express.Router();

// Routes pour la gestion des posts

// Route pour créer un nouveau post
postRouter.post('/', CreatePostContoller);

// Route pour obtenir un post par son identifiant
postRouter.get('/:id', GetPostByIdController);

// Route pour obtenir tous les posts
postRouter.get('/', GetAllPostsContoller);

// Route pour supprimer un post par son identifiant
postRouter.delete('/:id', DeletePostByIdContoller);

// Route pour mettre à jour un post par son identifiant
postRouter.put('/:id', UpdatePostByIdContoller);

// Exportation du routeur pour pouvoir l'utiliser dans d'autres fichiers
module.exports = postRouter;
