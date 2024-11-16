// Importation du modèle Post
const Post = require("../model/Post");

// Contrôleur pour créer un nouveau post
const CreatePostContoller = async (req, res) => {
    try {
        // Création d'un post
        const { title, description, photo } = req.body;

        const post = await Post.create({
            title, 
            description,
            photo,
        });

        res.json({
            status: "Le post est ajouté avec succès",
            data: post,
        });

    } catch (error) {
        res.json({ status: "Erreur", message: error.message });
    }
};

// Contrôleur pour obtenir un post par son identifiant
const GetPostByIdController = async (req, res) => {
    try {
        // Récupération de l'identifiant du post à partir des paramètres de la requête
        const postId = req.params.id;

        // Recherche du post dans la base de données par son ID
        const post = await Post.findById(postId);

        // Vérification si le post existe
        if (!post) {
            return res.status(404).json({
                status: "Erreur",
                message: "Post non trouvé",
            });
        }

        // Réponse avec les données du post trouvé
        res.json({
            status: "Post trouvé avec succès",
            data: post,
        });

    } catch (error) {
        // Gestion des erreurs
        res.status(500).json({
            status: "Erreur",
            message: error.message,
        });
    }
};

// Contrôleur pour obtenir tous les posts
const GetAllPostsContoller = async (req, res) => {
    try {
        // Récupération de tous les posts dans la base de données
        const posts = await Post.find();

        // Vérification si aucun post n'est trouvé
        if (!posts || posts.length === 0) {
            return res.status(404).json({
                status: "Erreur",
                message: "Aucun post trouvé",
            });
        }

        // Réponse avec les données des posts trouvés
        res.status(200).json({
            status: "Succès",
            message: "Tous les posts ont été trouvés avec succès",
            data: posts,
        });

    } catch (error) {
        // Gestion des erreurs lors de la récupération des posts
        res.status(500).json({
            status: "Erreur",
            message: "Erreur lors de la récupération des posts : " + error.message,
        });
    }
};

// Contrôleur pour supprimer un post par son identifiant
const DeletePostByIdContoller = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findByIdAndDelete(postId);

        if (!post) {
            return res.status(404).json({
                status: "Erreur",
                message: "Post non trouvé",
            });
        }

        res.json({
            status: "Succès",
            message: "Le post a été supprimé avec succès",
            data: post,
        });
    } catch (error) {
        res.status(500).json({ status: "Erreur", message: error.message });
    }
};

// Contrôleur pour mettre à jour un post par son identifiant
const UpdatePostByIdContoller = async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, description, photo } = req.body;

        const post = await Post.findByIdAndUpdate(postId, { title, description, photo }, { new: true });

        if (!post) {
            return res.status(404).json({
                status: "Erreur",
                message: "Post non trouvé",
            });
        }

        res.json({
            status: "Succès",
            message: "Le post a été mis à jour avec succès",
            data: post,
        });
    } catch (error) {
        res.status(500).json({ status: "Erreur", message: error.message });
    }
};

// Exportation des contrôleurs pour les utiliser dans les routes
module.exports = {
    GetAllPostsContoller,
    GetPostByIdController,
    CreatePostContoller,
    DeletePostByIdContoller,
    UpdatePostByIdContoller,
};
